class StripeBillingService
  def initialize(tenant)
    @tenant = tenant
  end

  def billing_overview
    return nil unless stripe_customer_id.present? && ENV["STRIPE_API_KEY"].present?

    begin
      customer = Stripe::Customer.retrieve(stripe_customer_id)

      # Get active subscriptions
      subscriptions = Stripe::Subscription.list(
        customer: stripe_customer_id,
        status: "active",
        limit: 100
      )

      # Get recent invoices
      invoices = Stripe::Invoice.list(
        customer: stripe_customer_id,
        limit: 10
      )

      # Calculate totals
      active_subscriptions = subscriptions.data
      total_monthly = calculate_monthly_total(active_subscriptions)
      next_billing_date = find_next_billing_date(active_subscriptions)

      {
        customer: customer,
        subscriptions: active_subscriptions,
        invoices: invoices.data,
        total_monthly: total_monthly,
        next_billing_date: next_billing_date,
        subscription_count: active_subscriptions.count
      }
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to fetch Stripe billing data: #{e.message}"
      nil
    end
  end

  def all_available_products
    return [] unless ENV["STRIPE_API_KEY"].present?

    begin
      products = Stripe::Product.list(active: true, limit: 100)

      # Group products by base name (remove tier suffixes)
      grouped_products = {}

      products.data.each do |product|
        base_name = extract_base_product_name(product.name)
        grouped_products[base_name] ||= []
        grouped_products[base_name] << product
      end

      # Convert to array format for frontend
      grouped_products.map do |base_name, products|
        prices = get_prices_for_products(products)
        current_subscription = find_current_subscription_for_product(products)

        {
          name: base_name,
          products: products,
          prices: prices,
          current_tier: current_subscription&.dig("tier") || "none",
          portal_configuration_id: find_portal_configuration_for_product(products.first)
        }
      end
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to fetch Stripe products: #{e.message}"
      []
    end
  end

  def create_portal_session(return_url)
    return nil unless stripe_customer_id.present?

    begin
      session = Stripe::BillingPortal::Session.create({
        customer: stripe_customer_id,
        return_url: return_url
      })

      session.url
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to create portal session: #{e.message}"
      nil
    end
  end

  def create_product_portal_session(product_id, return_url)
    return nil unless stripe_customer_id.present?

    begin
      # Find the portal configuration for this product
      portal_config_id = find_portal_configuration_for_product_by_id(product_id)

      if portal_config_id
        session = Stripe::BillingPortal::Session.create({
          customer: stripe_customer_id,
          return_url: return_url,
          configuration: portal_config_id
        })

        session.url
      else
        # Fallback to general portal
        create_portal_session(return_url)
      end
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to create product portal session: #{e.message}"
      nil
    end
  end

  private

  def stripe_customer_id
    @tenant&.stripe_customer_id
  end

  def calculate_monthly_total(subscriptions)
    total = 0

    subscriptions.each do |subscription|
      subscription.items.data.each do |item|
        price = item.price
        if price.recurring&.interval == "month"
          total += price.unit_amount * item.quantity
        end
      end
    end

    total / 100.0 # Convert from cents to dollars
  end

  def find_next_billing_date(subscriptions)
    return nil if subscriptions.empty?

    # Find the earliest next billing date
    subscriptions.map { |s| s.current_period_end }.min
  end

  def extract_base_product_name(product_name)
    # Remove common tier suffixes to group products
    name = product_name.downcase
    name = name.gsub(/\s+(basic|standard|premium|starter|enterprise|professional)$/i, "")
    name = name.gsub(/\s+(tier|plan)$/i, "")

    # Capitalize first letter of each word
    name.split.map(&:capitalize).join(" ")
  end

  def get_prices_for_products(products)
    prices = []

    products.each do |product|
      product_prices = Stripe::Price.list(product: product.id, active: true)
      prices.concat(product_prices.data)
    end

    prices
  end

  def find_current_subscription_for_product(products)
    return nil unless stripe_customer_id.present?

    subscriptions = Stripe::Subscription.list(
      customer: stripe_customer_id,
      status: "active"
    )

    subscriptions.data.each do |subscription|
      subscription.items.data.each do |item|
        products.each do |product|
          if item.price.product == product.id
            return {
              "subscription_id" => subscription.id,
              "tier" => extract_tier_from_product_name(product.name),
              "price" => item.price
            }
          end
        end
      end
    end

    nil
  end

  def extract_tier_from_product_name(product_name)
    name = product_name.downcase

    if name.include?("premium") || name.include?("enterprise")
      "premium"
    elsif name.include?("standard") || name.include?("professional")
      "standard"
    elsif name.include?("basic") || name.include?("starter")
      "basic"
    else
      "custom"
    end
  end

  def find_portal_configuration_for_product(product)
    # This would need to be mapped based on your Terraform configuration
    # For now, return a default or look up from metadata
    product.metadata&.dig("portal_configuration_id")
  end

  def find_portal_configuration_for_product_by_id(product_id)
    # Look up portal configuration from Terraform-defined mappings
    portal_mappings = {
      # Digital Marketing
      "digital_marketing_basic" => "digital_marketing_portal",
      "digital_marketing_standard" => "digital_marketing_portal",
      "digital_marketing_premium" => "digital_marketing_portal",

      # DevOps
      "managed_devops_starter" => "devops_portal",
      "managed_devops_basic" => "devops_portal",
      "managed_devops_standard" => "devops_portal",
      "managed_devops_enterprise" => "devops_portal",

      # Payment Processing
      "payment_processing_basic" => "payment_processing_portal",
      "payment_processing_standard" => "payment_processing_portal",
      "payment_processing_premium" => "payment_processing_portal",

      # Analytics
      "analytics_tracking_basic" => "analytics_portal",
      "analytics_tracking_standard" => "analytics_portal",
      "analytics_tracking_premium" => "analytics_portal",

      # AI/ML
      "ai_ml_features_basic" => "ai_ml_portal",
      "ai_ml_features_standard" => "ai_ml_portal",
      "ai_ml_features_premium" => "ai_ml_portal",

      # Blockchain
      "blockchain_integration" => "blockchain_portal",

      # Gambling
      "gambling_igaming" => "gambling_portal",

      # Real-time
      "real_time_features" => "real_time_portal",

      # Marketing
      "automated_digital_marketing" => "marketing_portal",

      # Autoblogger
      "autoblogger" => "autoblogger_portal",

      # Publisher
      "publisher" => "publisher_portal",

      # Support
      "customer_support_chatbot" => "support_portal",
      "sales_chatbot" => "sales_portal",

      # CRM
      "crm_system" => "crm_portal",

      # Maintenance
      "general_maintenance_retainer" => "maintenance_portal",

      # API
      "api_development" => "api_portal",

      # App Store
      "app_store_management" => "app_store_portal",

      # Blog CMS
      "blog_cms" => "blog_cms_portal",

      # i18n
      "internationalization" => "i18n_portal",

      # SSO
      "sso_social_login" => "sso_portal"
    }

    portal_mappings[product_id] || "default_portal"
  end
end
