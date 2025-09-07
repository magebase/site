class StripeInvoiceService
  def initialize(quote_request)
    @quote_request = quote_request
    @client = client
  end

  def create_draft_invoice
    return unless @quote_request.quoted? && stripe_customer_id.present?

    begin
      # Create draft invoice
      invoice = Stripe::Invoice.create({
        customer: stripe_customer_id,
        auto_advance: false, # Keep as draft
        collection_method: "send_invoice",
        days_until_due: 30,
        metadata: {
          quote_request_id: @quote_request.id,
          project_name: @quote_request.project_name
        }
      })

      # Add line items for the quote
      add_quote_line_items(invoice.id)

      # Add recommended managed services
      add_managed_services(invoice.id)

      # Store invoice ID in quote request
      @quote_request.update!(stripe_invoice_id: invoice.id)

      invoice
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to create Stripe draft invoice: #{e.message}"
      nil
    end
  end

  def get_managed_service_recommendations
    return [] unless ENV["STRIPE_API_KEY"].present?

    begin
      # Get all active products
      products = Stripe::Product.list({ active: true, limit: 100 })

      # Filter for managed services and MRR products
      managed_products = products.data.select do |product|
        product.metadata["type"] == "managed_service" ||
        product.metadata["type"] == "mrr" ||
        product.name.downcase.include?("managed") ||
        product.name.downcase.include?("retainer") ||
        product.name.downcase.include?("maintenance")
      end

      # Get prices for these products
      recommendations = []
      managed_products.each do |product|
        prices = Stripe::Price.list({ product: product.id, active: true })
        next if prices.data.empty?

        recommendations << {
          product: product,
          prices: prices.data,
          recommendation_level: determine_recommendation_level(product)
        }
      end

      # Sort by recommendation level and return top recommendations
      recommendations.sort_by { |r| recommendation_priority(r[:recommendation_level]) }
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to fetch Stripe products: #{e.message}"
      []
    end
  end

  def finalize_and_send_invoice
    return unless @quote_request.stripe_invoice_id.present?

    begin
      invoice = Stripe::Invoice.retrieve(@quote_request.stripe_invoice_id)
      invoice.finalize_invoice

      # Send invoice to customer
      invoice.send_invoice

      invoice
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to finalize and send Stripe invoice: #{e.message}"
      nil
    end
  end

  def create_payment_link
    return unless @quote_request.stripe_invoice_id.present?

    begin
      invoice = Stripe::Invoice.retrieve(@quote_request.stripe_invoice_id)
      payment_link = Stripe::PaymentLink.create({
        line_items: [ {
          price: invoice.lines.data.first.price.id,
          quantity: 1
        } ],
        metadata: {
          quote_request_id: @quote_request.id,
          invoice_id: invoice.id
        }
      })

      payment_link.url
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to create payment link: #{e.message}"
      nil
    end
  end

  def handle_payment_success(payment_intent_id)
    # Find the invoice associated with this payment
    payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
    invoice_id = payment_intent.metadata["invoice_id"]

    if invoice_id
      invoice = Stripe::Invoice.retrieve(invoice_id)
      quote_request = QuoteRequest.find_by(stripe_invoice_id: invoice_id)

      if quote_request && payment_intent.amount_received >= quote_request.deposit_amount.to_i * 100
        # Mark deposit as paid
        quote_request.pay_deposit!

        # Send Discord notification
        DiscordNotificationService.notify_quote_accepted(quote_request)

        Rails.logger.info "Payment successful for quote request #{quote_request.id}, invoice #{invoice.id}"
      end
    end
  end

  private

  def client
    @quote_request.client
  end

  def stripe_customer_id
    return nil unless client&.stripe_customer_id.present?
    client.stripe_customer_id
  end

  def add_quote_line_items(invoice_id)
    # Create a price for the deposit
    deposit_price = Stripe::Price.create({
      unit_amount: (@quote_request.deposit_amount.to_i * 100), # Convert to cents
      currency: "usd",
      product_data: {
        name: "Deposit for #{quote_request.project_name}",
        description: "Initial deposit for project development"
      }
    })

    # Add line item to invoice
    Stripe::InvoiceItem.create({
      customer: stripe_customer_id,
      invoice: invoice_id,
      price: deposit_price.id,
      quantity: 1
    })
  end

  def add_managed_services(invoice_id)
    recommendations = get_managed_service_recommendations

    # Always add maintenance retainer and devops starter for most projects
    maintenance_retainer = find_product_by_name(recommendations, "maintenance retainer")
    devops_starter = find_product_by_name(recommendations, "managed devops starter")

    # Add maintenance retainer
    if maintenance_retainer
      price = select_price_by_tier(maintenance_retainer[:prices], determine_project_tier)
      add_service_to_invoice(invoice_id, maintenance_retainer[:product], price) if price
    end

    # Add devops starter
    if devops_starter
      price = select_price_by_tier(devops_starter[:prices], determine_project_tier)
      add_service_to_invoice(invoice_id, devops_starter[:product], price) if price
    end

    # Add feature-specific managed services
    feature_recommendations = get_feature_based_recommendations(recommendations)
    feature_recommendations.each do |rec|
      price = select_price_by_tier(rec[:prices], determine_project_tier)
      add_service_to_invoice(invoice_id, rec[:product], price) if price
    end
  end

  def find_product_by_name(recommendations, name)
    recommendations.find { |r| r[:product].name.downcase.include?(name.downcase) }
  end

  def determine_project_tier
    project_cost = @quote_request.estimated_cost.to_f

    case project_cost
    when 0..15000 then "starter"
    when 15001..35000 then "professional"
    when 35001..75000 then "enterprise"
    else "premium"
    end
  end

  def select_price_by_tier(prices, tier)
    # Find price that matches the tier, or fallback to monthly recurring
    tier_price = prices.find { |p| p.metadata["tier"] == tier }
    return tier_price if tier_price

    # Fallback to monthly recurring price
    prices.find { |p| p.recurring&.interval == "month" } || prices.first
  end

  def add_service_to_invoice(invoice_id, product, price)
    Stripe::InvoiceItem.create({
      customer: stripe_customer_id,
      invoice: invoice_id,
      price: price.id,
      quantity: 1,
      description: "#{product.name} - #{price.metadata['tier']&.titleize || 'Monthly'} subscription"
    })
  end

  def determine_recommendation_level(product)
    name = product.name.downcase

    # Strong suggestions
    return "strong" if name.include?("maintenance retainer")
    return "strong" if name.include?("managed devops starter")

    # Feature-based recommendations
    selected_features = @quote_request.selected_features.map(&:name).map(&:downcase)

    # Database management for data-heavy features
    return "recommended" if name.include?("database") && selected_features.any? { |f| f.include?("analytics") || f.include?("data") }

    # Security monitoring for auth features
    return "recommended" if name.include?("security") && selected_features.any? { |f| f.include?("auth") || f.include?("security") }

    # Performance monitoring for high-traffic features
    return "recommended" if name.include?("monitoring") && selected_features.any? { |f| f.include?("real-time") || f.include?("high-traffic") }

    # Backup services for data features
    return "recommended" if name.include?("backup") && selected_features.any? { |f| f.include?("database") || f.include?("file") }

    "optional"
  end

  def recommendation_priority(level)
    case level
    when "strong" then 1
    when "recommended" then 2
    when "optional" then 3
    else 4
    end
  end

  def get_feature_based_recommendations(recommendations)
    selected_features = @quote_request.selected_features.map(&:name).map(&:downcase)
    feature_based = []

    recommendations.each do |rec|
      product_name = rec[:product].name.downcase

      # Database management for data features
      if product_name.include?("database") && selected_features.any? { |f| f.include?("analytics") || f.include?("data") }
        feature_based << rec
      end

      # Security monitoring for auth features
      if product_name.include?("security") && selected_features.any? { |f| f.include?("auth") || f.include?("security") }
        feature_based << rec
      end

      # Performance monitoring for real-time features
      if product_name.include?("monitoring") && selected_features.any? { |f| f.include?("real-time") || f.include?("high-traffic") }
        feature_based << rec
      end

      # Backup services for data features
      if product_name.include?("backup") && selected_features.any? { |f| f.include?("database") || f.include?("file") }
        feature_based << rec
      end
    end

    feature_based.uniq
  end

  def quote_request
    @quote_request
  end
end
