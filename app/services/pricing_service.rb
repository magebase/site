class PricingService
  def initialize(quote_request)
    @quote_request = quote_request
  end

  def calculate_price
    features = @quote_request.selected_features

    # Automatically include marketing pages SEO feature for all quotes
    marketing_pages_feature = Feature.find_by(name: '5_high_converting_seo_marketing_pages')
    if marketing_pages_feature && !features.include?(marketing_pages_feature)
      # Add the feature to the quote request through the join table
      @quote_request.quote_request_features.create!(feature: marketing_pages_feature)
      features = features + [marketing_pages_feature]
    end

    use_case = @quote_request.use_case

    # Base pricing calculation
    base_cost = calculate_base_cost(features, use_case)
    complexity_multiplier = calculate_complexity_multiplier(features)
    timeline_adjustment = calculate_timeline_adjustment(@quote_request.project_plan_json)
    capacity_adjustment = calculate_capacity_adjustment

    estimated_cost = base_cost * complexity_multiplier * timeline_adjustment * capacity_adjustment

    # Monthly retainer calculation (20% of total cost, spread over 12 months)
    monthly_retainer = estimated_cost * 0.20 / 12

    # Deposit amount (30% of total cost)
    deposit_amount = estimated_cost * 0.30

    # Store AI pricing data
    ai_pricing = {
      base_cost: base_cost,
      complexity_multiplier: complexity_multiplier,
      timeline_adjustment: timeline_adjustment,
      capacity_adjustment: capacity_adjustment,
      estimated_cost: estimated_cost,
      monthly_retainer: monthly_retainer,
      deposit_amount: deposit_amount,
      breakdown: generate_cost_breakdown(features, use_case)
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
end
