class PricingService
  def initialize(quote_request)
    @quote_request = quote_request
  end

  def calculate_price
    features = @quote_request.selected_features

    # Automatically include marketing pages SEO feature for all quotes
    marketing_pages_feature = Feature.find_by(name: "5_high_converting_seo_marketing_pages")
    if marketing_pages_feature && !features.include?(marketing_pages_feature)
      # Add the feature to the quote request through the join table
      @quote_request.quote_request_features.create!(feature: marketing_pages_feature)
      features = features + [ marketing_pages_feature ]
    end

    use_case = @quote_request.use_case

    # Get AI-powered pricing analysis
    ai_analysis = get_ai_pricing_analysis(features, use_case)

    # Base pricing calculation with AI insights
    base_cost = ai_analysis["base_cost"] || calculate_base_cost(features, use_case)
    complexity_multiplier = ai_analysis["complexity_multiplier"] || calculate_complexity_multiplier(features)
    timeline_adjustment = ai_analysis["timeline_adjustment"] || calculate_timeline_adjustment(@quote_request.project_plan_json)
    capacity_adjustment = calculate_capacity_adjustment

    estimated_cost = base_cost * complexity_multiplier * timeline_adjustment * capacity_adjustment

    # Monthly retainer calculation (use AI recommendation or default to 20%)
    monthly_retainer_percentage = ai_analysis["monthly_retainer_percentage"] || 0.20
    monthly_retainer = estimated_cost * monthly_retainer_percentage / 12

    # Deposit amount (use AI recommendation or default to 30%)
    deposit_percentage = ai_analysis["deposit_percentage"] || 0.30
    deposit_amount = estimated_cost * deposit_percentage

    # Get Stripe product recommendations
    product_recommendations = get_stripe_product_recommendations(features, use_case, estimated_cost)

    # Store AI pricing data
    ai_pricing = {
      base_cost: base_cost,
      complexity_multiplier: complexity_multiplier,
      timeline_adjustment: timeline_adjustment,
      capacity_adjustment: capacity_adjustment,
      estimated_cost: estimated_cost,
      monthly_retainer: monthly_retainer,
      deposit_amount: deposit_amount,
      ai_analysis: ai_analysis,
      breakdown: generate_cost_breakdown(features, use_case),
      stripe_product_recommendations: product_recommendations
    }

    @quote_request.update!(
      ai_pricing_json: ai_pricing,
      estimated_cost: estimated_cost,
      monthly_retainer: monthly_retainer,
      deposit_amount: deposit_amount
    )
  end

  private

  def calculate_base_cost(features, use_case)
    # Base costs for different use cases
    base_costs = {
      "ecommerce" => 15000,
      "social_app" => 20000,
      "marketplace" => 25000,
      "saas" => 30000,
      "mobile_app" => 18000,
      "web_app" => 12000,
      "api_integration" => 8000,
      "data_analytics" => 22000,
      "ai_ml" => 35000,
      "blockchain" => 40000
    }

    base_cost = base_costs[use_case] || 15000

    # Add feature costs
    feature_costs = features.sum(&:base_cost)

    base_cost + feature_costs
  end

  def calculate_complexity_multiplier(features)
    # Complexity based on number and complexity level of features
    return 1.0 if features.empty?

    feature_count = features.count
    avg_complexity = features.sum(&:complexity_level).to_f / feature_count

    # Base multiplier from feature count
    count_multiplier = case feature_count
    when 0..3 then 1.0
    when 4..7 then 1.2
    else 1.4
    end

    # Complexity multiplier from feature complexity levels
    complexity_multiplier = case avg_complexity
    when 0..1 then 1.0
    when 1..2 then 1.1
    when 2..3 then 1.3
    when 3..4 then 1.5
    else 1.8
    end

    count_multiplier * complexity_multiplier
  end

  def calculate_timeline_adjustment(project_plan)
    return 1.0 unless project_plan.present?

    # Adjust price based on timeline requirements
    timeline = project_plan["timeline_months"] || 3
    standard_timeline = 3

    if timeline < standard_timeline
      # Rush job - increase price
      1.5
    elsif timeline > standard_timeline
      # Extended timeline - slight discount
      0.9
    else
      1.0
    end
  end

  def calculate_capacity_adjustment
    capacity = TeamCapacity.current_capacity
    capacity.capacity_multiplier
  end

  def generate_cost_breakdown(features, use_case)
    breakdown = {
      base_use_case: {
        type: use_case,
        cost: calculate_base_cost([], use_case)
      },
      features: []
    }

    features.each do |feature|
      breakdown[:features] << {
        name: feature.name,
        cost: feature.base_cost
      }
    end

    breakdown
  end

  def get_stripe_product_recommendations(features, use_case, estimated_cost)
    # Always recommend maintenance retainer and managed devops starter
    forced_recommendations = [
      {
        product_id: "maintenance_retainer",
        name: "Maintenance Retainer",
        description: "Monthly maintenance and support retainer",
        recommended: true,
        reason: "Essential for ongoing maintenance and updates"
      },
      {
        product_id: "managed_devops_starter",
        name: "Managed DevOps Starter",
        description: "Basic DevOps management and monitoring",
        recommended: true,
        reason: "Critical for production stability and performance"
      }
    ]

    # Get AI-powered recommendations from Stripe products
    ai_recommendations = get_ai_product_recommendations(features, use_case, estimated_cost)

    # Combine forced recommendations with AI recommendations
    all_recommendations = forced_recommendations + ai_recommendations

    # Remove duplicates based on product_id
    all_recommendations.uniq { |r| r[:product_id] }
  end

  def get_ai_product_recommendations(features, use_case, estimated_cost)
    return [] unless ENV["GOOGLE_STUDIO_API_KEY"].present? || ENV["OPENAI_API_KEY"].present? || ENV["ANTHROPIC_API_KEY"].present?

    begin
      # Fetch available Stripe products and prices
      stripe_products = fetch_stripe_products_for_ai

      # If no products available, return empty array
      return [] if stripe_products.empty?

      # Build AI prompt with project details and available products
      prompt = build_product_recommendation_prompt(features, use_case, estimated_cost, stripe_products)

      # Get AI recommendations
      llm_service = LlmService.new
      response = llm_service.complete(prompt, {
        temperature: 0.3,
        max_tokens: 1500
      })

      # Parse AI response into recommendations
      parse_product_recommendation_response(response, stripe_products)
    rescue => e
      Rails.logger.error("AI product recommendation failed: #{e.message}")
      []
    end
  end

  def fetch_stripe_products_for_ai
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
        product.name.downcase.include?("maintenance") ||
        product.name.downcase.include?("support") ||
        product.name.downcase.include?("monitoring")
      end

      # Get prices for these products and format for AI
      product_data = []
      managed_products.each do |product|
        prices = Stripe::Price.list({ product: product.id, active: true })
        next if prices.data.empty?

        price_info = prices.data.map do |price|
          {
            id: price.id,
            amount: price.unit_amount ? (price.unit_amount / 100.0) : 0, # Convert cents to dollars
            currency: price.currency,
            interval: price.recurring&.interval,
            interval_count: price.recurring&.interval_count,
            tier: price.metadata["tier"] || "standard"
          }
        end

        product_data << {
          id: product.id,
          name: product.name,
          description: product.description || product.name,
          type: product.metadata["type"] || "managed_service",
          prices: price_info
        }
      end

      product_data
    rescue Stripe::StripeError => e
      Rails.logger.error "Failed to fetch Stripe products for AI: #{e.message}"
      []
    end
  end

  def build_product_recommendation_prompt(features, use_case, estimated_cost, stripe_products)
    feature_names = features.map(&:name)
    feature_descriptions = features.map { |f| "#{f.name}: #{f.description}" }.join("\n")

    products_text = stripe_products.map do |product|
      prices_text = product[:prices].map do |price|
        if price[:interval]
          "$#{price[:amount]}/#{price[:interval]} (#{price[:tier]})"
        else
          "$#{price[:amount]} one-time (#{price[:tier]})"
        end
      end.join(", ")

      "#{product[:name]} (#{product[:description]})\n  Pricing: #{prices_text}"
    end.join("\n\n")

    <<~PROMPT
    You are an expert business consultant specializing in software development pricing and managed services.

    PROJECT DETAILS:
    - Use Case: #{use_case}
    - Estimated Project Cost: $#{estimated_cost}
    - Selected Features: #{feature_names.join(", ")}
    - Feature Details:
    #{feature_descriptions}

    AVAILABLE MANAGED SERVICES:
    #{products_text}

    TASK: Analyze this project and recommend the most appropriate managed services from the available options above.

    IMPORTANT GUIDELINES:
    1. Focus on services that provide ongoing value and recurring revenue
    2. Consider the project complexity, use case, and selected features
    3. Recommend services that complement the project's technical requirements
    4. Prioritize services that ensure long-term success and maintenance
    5. Do NOT recommend the "Maintenance Retainer" or "Managed DevOps Starter" as these are already included

    ANALYSIS FRAMEWORK:
    - Evaluate project scale and complexity based on cost and feature count
    - Identify technical domains that need specialized management (e.g., security, performance, data)
    - Consider operational requirements for the specific use case
    - Assess risk factors that would benefit from managed services

    RESPONSE FORMAT: Return a JSON array of recommendations with this exact structure:
    [
      {
        "product_id": "exact_product_id_from_list",
        "name": "Product Name",
        "description": "Brief description",
        "recommended": true,
        "reason": "Specific reason why this service is recommended for this project"
      }
    ]

    Only recommend services that are actually listed above. Be selective - only recommend the most relevant 2-4 services maximum.
    PROMPT
  end

  def parse_product_recommendation_response(response, stripe_products)
    begin
      # Extract JSON from response
      json_match = response.to_s.match(/\[.*\]/m)
      return [] unless json_match

      recommendations_data = JSON.parse(json_match[0])

      # Validate and format recommendations
      recommendations_data.map do |rec|
        # Find the matching product to ensure data integrity
        matching_product = stripe_products.find { |p| p[:id] == rec["product_id"] }

        if matching_product
          {
            product_id: rec["product_id"],
            name: rec["name"] || matching_product[:name],
            description: rec["description"] || matching_product[:description],
            recommended: rec["recommended"] || true,
            reason: rec["reason"]
          }
        end
      end.compact
    rescue JSON::ParserError => e
      Rails.logger.error("Failed to parse AI product recommendations: #{e.message}")
      []
    end
  end

  private

  def get_ai_pricing_analysis(features, use_case)
    return {} unless ENV["GOOGLE_STUDIO_API_KEY"].present? || ENV["OPENAI_API_KEY"].present? || ENV["ANTHROPIC_API_KEY"].present?

    begin
      llm_service = LlmService.new
      llm_service.generate_pricing_analysis(features, use_case)
    rescue => e
      Rails.logger.error("AI pricing analysis failed: #{e.message}")
      {}
    end
  end
end
