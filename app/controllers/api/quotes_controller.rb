class Api::QuotesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [ :estimate ]

  # Override authentication for API controllers
  def authenticate_user!
    # API endpoints don't require authentication
  end

  USE_CASE_DEFAULT_FEATURES = {
    "E-commerce Platform" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Social Networking App" => [
      "user_authentication",
      "real_time_features",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Real Estate Marketplace" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Logistics & Delivery App" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Event Management System" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "SaaS Application" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Content Management System" => [
      "user_authentication",
      "admin_dashboard",
      "analytics_tracking",
      "blog_cms"
    ],
    "Customer Relationship Management" => [
      "user_authentication",
      "admin_dashboard",
      "analytics_tracking",
      "crm"
    ],
    "Healthcare Management System" => [
      "user_authentication",
      "admin_dashboard",
      "analytics_tracking",
      "crm",
      "hipaa_compliance"
    ],
    "Project Management Tool" => [
      "user_authentication",
      "admin_dashboard",
      "analytics_tracking",
      "task_management"
    ],
    "Inventory Management System" => [
      "user_authentication",
      "admin_dashboard",
      "analytics_tracking",
      "inventory_tracking"
    ],
    "Appointment Scheduling App" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Learning Management System" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Property Management System" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Food Delivery Platform" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Ride-Sharing App" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Streaming Service" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "E-learning Platform" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Telemedicine App" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Cryptocurrency Exchange" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Job Board Platform" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Review & Rating Platform" => [
      "user_authentication",
      "analytics_tracking",
      "admin_dashboard",
      "social_login"
    ],
    "Subscription Box Service" => [
      "user_authentication",
      "payment_processing",
      "admin_dashboard",
      "analytics_tracking"
    ],
    "Community Forum Platform" => [
      "user_authentication",
      "real_time_features",
      "analytics_tracking",
      "admin_dashboard"
    ]
  }

  def estimate
    # European countries for GDPR compliance
    european_countries = [
      "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
      "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
      "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
      "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
      "United Kingdom", "Norway", "Switzerland", "Iceland", "Liechtenstein"
    ]

    # Check if delivery address is in Europe and add GDPR compliance
    delivery_address = params[:delivery_address]
    if delivery_address.present? && delivery_address.downcase != "remote"
      is_european = european_countries.any? do |country|
        delivery_address.downcase.include?(country.downcase)
      end

      if is_european && params[:selected_features].present?
        params[:selected_features] << "gdpr_compliance" unless params[:selected_features].include?("gdpr_compliance")
      end
    end

    # Validate features for selected use case
    if params[:use_case].present? && params[:selected_features].present?
      use_case = params[:use_case]
      selected_features = params[:selected_features]
      default_features = USE_CASE_DEFAULT_FEATURES[use_case] || []

      missing_features = default_features - selected_features
      if missing_features.any?
        render json: {
          success: false,
          error: "Missing required features for #{use_case}: #{missing_features.join(', ')}"
        }, status: :unprocessable_entity
        return
      end
    end

    # Get features directly
    features = []
    if params[:selected_features].present?
      feature_names = params[:selected_features]
      features = Feature.where(name: feature_names)
    end

    # Generate project plan
    project_plan = generate_project_plan(features, params[:use_case])

    # Use AI to analyze and adjust the quote
    ai_analysis = analyze_business_idea_with_ai(params, features)
    adjusted_params = ai_analysis[:adjusted_params]
    generated_tags = ai_analysis[:tags]

    # Calculate pricing with AI adjustments
    pricing_data = calculate_pricing(features, project_plan, adjusted_params[:pricing_model])

    # Apply AI adjustments to pricing
    pricing_data = apply_ai_pricing_adjustments(pricing_data, ai_analysis)

    # Return the estimate
    render json: {
      success: true,
      estimate: pricing_data.merge(
        project_plan: project_plan,
        ai_insights: ai_analysis[:insights],
        generated_tags: generated_tags,
        ai_adjustments: ai_analysis[:adjustments],
        estimated_time_to_mvp: project_plan[:timeline_months],
        time_to_mvp_marketing: generate_time_to_mvp_marketing_text(project_plan[:timeline_months], params[:priority])
      )
    }
  rescue => e
    Rails.logger.error "Quote estimation error: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    render json: {
      success: false,
      error: e.message
    }, status: :unprocessable_entity
  end

  private



  def generate_project_plan(features, use_case)
    # Generate project plan using AI analysis (copied from ProjectPlanningService)
    {
      timeline_months: calculate_timeline(features, use_case),
      milestones: generate_milestones(features, use_case)
    }
  end

  def calculate_pricing(features, project_plan, pricing_model)
    use_case = params[:use_case] || "web_app"

    # Base pricing calculation (copied from PricingService)
    base_cost = calculate_base_cost(features, use_case)
    complexity_multiplier = calculate_complexity_multiplier(features)
    timeline_adjustment = calculate_timeline_adjustment(project_plan)
    capacity_adjustment = calculate_capacity_adjustment

    # Apply priority cost adjustment
    priority_multiplier = case params[:priority]
    when "high" then 1.5  # 50% more expensive
    when "low" then 0.75  # 25% less expensive
    else 1.0              # medium priority
    end

    estimated_cost = base_cost * complexity_multiplier * timeline_adjustment * capacity_adjustment * priority_multiplier

    case pricing_model
    when "flat_fee"
      # Flat fee + monthly hosting + optional retainer
      hosting_monthly = estimated_cost * 0.05 # 5% of project cost per month
      retainer_monthly = estimated_cost * 0.15 / 12 # Optional 15% annual retainer
      deposit_amount = estimated_cost * 0.30

      {
        pricing_model: "flat_fee",
        estimated_cost: estimated_cost,
        base_cost: estimated_cost,
        monthly_hosting: hosting_monthly,
        monthly_retainer: retainer_monthly,
        deposit_amount: deposit_amount,
        capacity_adjustment: capacity_adjustment,
        breakdown: generate_cost_breakdown(features, use_case)
      }

    when "monthly_subscription"
      # Monthly subscription with 2-year minimum + 3-month bond
      monthly_fee = estimated_cost * 0.25 / 12 # 25% of project cost annually
      bond_amount = monthly_fee * 3 # 3 months prepayment
      minimum_commitment_months = 24

      {
        pricing_model: "monthly_subscription",
        monthly_fee: monthly_fee,
        bond_amount: bond_amount,
        minimum_commitment_months: minimum_commitment_months,
        capacity_adjustment: capacity_adjustment,
        breakdown: generate_cost_breakdown(features, use_case)
      }

    else
      # Default to flat fee model
      hosting_monthly = estimated_cost * 0.05
      retainer_monthly = estimated_cost * 0.15 / 12
      deposit_amount = estimated_cost * 0.30

      {
        pricing_model: "flat_fee",
        estimated_cost: estimated_cost,
        base_cost: estimated_cost,
        monthly_hosting: hosting_monthly,
        monthly_retainer: retainer_monthly,
        deposit_amount: deposit_amount,
        capacity_adjustment: capacity_adjustment,
        breakdown: generate_cost_breakdown(features, use_case)
      }
    end
  end

  # Copy methods from ProjectPlanningService
  def calculate_timeline(features, use_case)
    # If timeline parameter is not provided, use RubyLLM to calculate it
    if params[:timeline].blank?
      return calculate_timeline_with_ruby_llm(features, use_case)
    end

    # Otherwise, use the existing formula-based calculation
    base_timelines = {
      "ecommerce" => 2,
      "social_app" => 3,
      "marketplace" => 4,
      "saas" => 5,
      "mobile_app" => 3,
      "web_app" => 2,
      "api_integration" => 1,
      "data_analytics" => 3,
      "ai_ml" => 6,
      "blockchain" => 8
    }

    base_months = base_timelines[use_case] || 3

    complex_features = features.select { |f| [ "ai_ml", "blockchain", "real_time_features" ].include?(f.name) }.count
    feature_adjustment = features.count * 0.2

    # Apply velocity adjustment
    velocity_multiplier = case params[:timeline] # Note: timeline param now contains velocity
    when "ASAP (Rush)" then 0.5
    when "1-2 weeks" then 0.75
    when "1 month" then 1.0
    when "2-3 months" then 1.25
    when "3-6 months" then 1.5
    when "6+ months" then 2.0
    else 1.0
    end

    # Apply priority adjustment
    priority_multiplier = case params[:priority]
    when "high" then 0.75  # 25% faster
    when "low" then 1.5   # 50% slower
    else 1.0              # medium priority
    end

    ((base_months + complex_features + feature_adjustment) * velocity_multiplier * priority_multiplier).round
  end

  def calculate_timeline_with_ruby_llm(features, use_case)
    return 3 unless ENV["OPENAI_API_KEY"].present?

    begin
      # Prepare context for AI analysis
      context = {
        use_case: use_case,
        priority: params[:priority] || "medium",
        customization_level: params[:customization_level],
        integration_complexity: params[:integration_complexity],
        redesign_count: params[:redesign_count] || 0,
        selected_features: features.pluck(:name),
        special_requirements: params[:special_requirements],
        inspiration: params[:inspiration]
      }

      # AI prompt for timeline calculation
      timeline_prompt = <<~PROMPT
        Based on the following software development project details, estimate the timeline in months:

        Project Details:
        - Use Case: #{context[:use_case]}
        - Priority: #{context[:priority]}
        - Customization Level: #{context[:customization_level]}
        - Integration Complexity: #{context[:integration_complexity]}
        - Redesign Iterations: #{context[:redesign_count]}
        - Selected Features: #{context[:selected_features].join(', ')}
        - Special Requirements: #{context[:special_requirements]}
        - Inspiration: #{context[:inspiration]}

        Consider:
        - Base timeline for this type of project
        - Complexity of selected features
        - Priority level impact on speed
        - Integration requirements
        - Customization level

        Provide only a JSON response with a single key "months" containing the estimated number of months (integer between 1-12).
        Example: {"months": 3}
      PROMPT

      # Get AI response
      response = RubyLLM.complete(
        model: "gpt-4",
        messages: [ { role: "user", content: timeline_prompt } ],
        temperature: 0.2
      )

      # Parse AI response
      ai_response = JSON.parse(response.content)
      months = ai_response["months"].to_i

      # Ensure reasonable bounds
      months.clamp(1, 12)
    rescue => e
      Rails.logger.error "AI timeline calculation error: #{e.message}"
      # Fallback to formula-based calculation
      calculate_timeline_with_formula(features, use_case)
    end
  end

  def calculate_timeline_with_formula(features, use_case)
    base_timelines = {
      "ecommerce" => 2,
      "social_app" => 3,
      "marketplace" => 4,
      "saas" => 5,
      "mobile_app" => 3,
      "web_app" => 2,
      "api_integration" => 1,
      "data_analytics" => 3,
      "ai_ml" => 6,
      "blockchain" => 8
    }

    base_months = base_timelines[use_case] || 3
    complex_features = features.select { |f| [ "ai_ml", "blockchain", "real_time_features" ].include?(f.name) }.count
    feature_adjustment = features.count * 0.2

    # Apply priority adjustment
    priority_multiplier = case params[:priority]
    when "high" then 0.75  # 25% faster
    when "low" then 1.5   # 50% slower
    else 1.0              # medium priority
    end

    ((base_months + complex_features + feature_adjustment) * priority_multiplier).round
  end

  def generate_milestones(features, use_case)
    # Simplified milestone generation
    [
      { name: "Planning & Design", duration: 1, order: 1 },
      { name: "Development", duration: calculate_timeline(features, use_case) - 2, order: 2 },
      { name: "Testing & QA", duration: 1, order: 3 },
      { name: "Deployment & Launch", duration: 1, order: 4 }
    ]
  end

  def determine_team_requirements(features)
    team = {
      frontend_developer: false,
      backend_developer: false,
      fullstack_developer: false,
      mobile_developer: false,
      devops_engineer: false,
      ui_ux_designer: false,
      qa_tester: false,
      project_manager: true
    }

    features.each do |feature|
      case feature.name
      when "mobile_responsive", "mobile_app"
        team[:frontend_developer] = true
        team[:mobile_developer] = true if feature.name == "mobile_app"
      when "standalone_developer_api_openapi_portal", "database_design", "third_party_integrations"
        team[:backend_developer] = true
      when "real_time_features", "payment_processing", "security_features"
        team[:backend_developer] = true
        team[:devops_engineer] = true if feature.name == "security_features"
      when "admin_dashboard", "analytics_tracking"
        team[:frontend_developer] = true
        team[:backend_developer] = true
      when "ai_ml"
        team[:backend_developer] = true
        team[:devops_engineer] = true
      when "deployment_devops"
        team[:devops_engineer] = true
      when "testing_qa"
        team[:qa_tester] = true
      end
    end

    team
  end

  def recommend_technology_stack(use_case, features)
    # Simplified tech stack recommendation
    [ "React", "TypeScript", "Node.js", "PostgreSQL" ]
  end

  def identify_risks_and_assumptions(features, use_case)
    # Simplified risks
    [ "Timeline may vary based on feature complexity", "Third-party API availability" ]
  end

  def define_deliverables(use_case, features)
    # Simplified deliverables
    [ "Web application", "Source code", "Documentation", "Deployment" ]
  end

  # Copy methods from PricingService
  def calculate_base_cost(features, use_case)
    # Map form use case values to pricing keys
    use_case_mapping = {
      "E-commerce" => "ecommerce",
      "Small Business Branded Site" => "web_app",
      "Food Delivery" => "mobile_app",
      "Equipment Hire" => "web_app",
      "Financial Services or Banking" => "saas",
      "Gambling or iGaming" => "mobile_app",
      "Digital Marketing Agency Site" => "web_app",
      "Cryptocurrency Exchange" => "blockchain",
      "Fitness & Wellness" => "mobile_app",
      "Service Booking" => "web_app",
      "Healthcare Management System" => "saas",
      "Telemedicine" => "mobile_app",
      "Educational" => "web_app",
      "E-learning" => "saas",
      "Business Management Software" => "saas",
      "Customer Relationship Management" => "saas",
      "Project Management Tool" => "saas",
      "Real Estate" => "marketplace",
      "Ride-Sharing" => "mobile_app",
      "Logistics & Delivery" => "mobile_app",
      "Appointment Scheduling" => "web_app",
      "Social Networking" => "social_app",
      "Video Gaming" => "mobile_app",
      "Event Management System" => "web_app",
      "Content Management System" => "web_app",
      "Inventory Management System" => "saas",
      "Internal Tool" => "web_app",
      "Streaming Service" => "saas",
      "Job Board" => "marketplace",
      "Review & Rating" => "web_app",
      "Subscription Box Service" => "ecommerce",
      "Community Forum" => "social_app",
      "Custom Application" => "web_app"
    }

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

    # Map the use case to the pricing key
    pricing_key = use_case_mapping[use_case] || "web_app"
    base_cost = base_costs[pricing_key] || 15000
    feature_costs = features.sum(&:base_cost)

    base_cost + feature_costs
  end

  def calculate_complexity_multiplier(features)
    return 1.0 if features.empty?

    feature_count = features.count
    avg_complexity = features.average(:complexity_level).to_f

    count_multiplier = case feature_count
    when 0..3 then 1.0
    when 4..7 then 1.2
    else 1.4
    end

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

    timeline = project_plan["timeline_months"] || 3
    standard_timeline = 3

    if timeline < standard_timeline
      1.5
    elsif timeline > standard_timeline
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

  def quote_estimate_params
    params.permit(
      :use_case,
      :timeline,
      :customization_level,
      :integration_complexity,
      :redesign_count,
      selected_features: []
    )
  end

  def analyze_business_idea_with_ai(params, features)
    return { adjusted_params: params, tags: [], insights: {}, adjustments: {} } unless ENV["OPENAI_API_KEY"].present?

    begin
      # Prepare context for AI analysis
      context = {
        use_case: params[:use_case],
        timeline: params[:timeline],
        customization_level: params[:customization_level],
        integration_complexity: params[:integration_complexity],
        redesign_count: params[:redesign_count],
        selected_features: features.pluck(:name),
        special_requirements: params[:special_requirements],
        inspiration: params[:inspiration]
      }

      # AI prompt for business analysis
      analysis_prompt = <<~PROMPT
        Analyze this software development project request and provide insights:

        Project Details:
        - Use Case: #{context[:use_case]}
        - Timeline: #{context[:timeline]}
        - Customization Level: #{context[:customization_level]}
        - Integration Complexity: #{context[:integration_complexity]}
        - Redesign Iterations: #{context[:redesign_count]}
        - Selected Features: #{context[:selected_features].join(', ')}
        - Special Requirements: #{context[:special_requirements]}
        - Inspiration: #{context[:inspiration]}

        Please provide:
        1. Project complexity assessment (Low/Medium/High/Very High)
        2. Recommended adjustments to timeline or pricing
        3. Risk factors identified
        4. Suggested technology stack additions
        5. Relevant business tags/categories for this project
        6. Pricing adjustment factor (0.8-1.5 multiplier)

        Format your response as JSON with keys: complexity, adjustments, risks, tech_suggestions, tags, pricing_multiplier
      PROMPT

      # Get AI response
      response = RubyLLM.complete(
        model: "gpt-4",
        messages: [ { role: "user", content: analysis_prompt } ],
        temperature: 0.3
      )

      # Parse AI response
      ai_response = JSON.parse(response.content)

      # Generate tags based on AI analysis
      tags = generate_business_tags(context, ai_response)

      # Apply adjustments
      adjusted_params = apply_ai_adjustments(params, ai_response)

      {
        adjusted_params: adjusted_params,
        tags: tags,
        insights: {
          complexity: ai_response["complexity"],
          risks: ai_response["risks"],
          tech_suggestions: ai_response["tech_suggestions"],
          business_tags: tags,
          recommendations: ai_response["tech_suggestions"] || []
        },
        adjustments: {
          pricing_multiplier: ai_response["pricing_multiplier"] || 1.0,
          timeline_adjustment: ai_response["adjustments"]&.dig("timeline"),
          complexity_adjustment: ai_response["adjustments"]&.dig("complexity")
        }
      }
    rescue => e
      Rails.logger.error "AI analysis error: #{e.message}"
      { adjusted_params: params, tags: [], insights: {}, adjustments: {} }
    end
  end

  def generate_business_tags(context, ai_response)
    base_tags = []

    # Add tags based on use case
    case context[:use_case]
    when "E-commerce Platform"
      base_tags += [ "ecommerce", "retail", "shopping" ]
    when "Social Networking App"
      base_tags += [ "social", "networking", "community" ]
    when "Healthcare Management System"
      base_tags += [ "healthcare", "medical", "patient-management" ]
    when "Fitness & Wellness App"
      base_tags += [ "fitness", "health", "wellness" ]
    when "Gaming Platform"
      base_tags += [ "gaming", "entertainment", "gamification" ]
    when "Financial Services App"
      base_tags += [ "finance", "fintech", "payments" ]
    end

    # Add tags based on features
    context[:selected_features].each do |feature|
      case feature
      when "ai_ml"
        base_tags += [ "artificial-intelligence", "machine-learning" ]
      when "blockchain"
        base_tags += [ "blockchain", "cryptocurrency", "web3" ]
      when "payment_processing"
        base_tags += [ "payments", "ecommerce", "transactions" ]
      when "real_time_features"
        base_tags += [ "real-time", "live-updates", "websocket" ]
      when "mobile_app"
        base_tags += [ "mobile", "ios", "android" ]
      end
    end

    # Add AI-generated tags
    if ai_response["tags"].is_a?(Array)
      base_tags += ai_response["tags"]
    end

    # Remove duplicates and return
    base_tags.uniq
  end

  def apply_ai_adjustments(original_params, ai_response)
    adjusted = original_params.dup

    # Apply timeline adjustments
    if ai_response["adjustments"]&.dig("timeline")
      adjusted[:timeline] = ai_response["adjustments"]["timeline"]
    end

    # Apply complexity adjustments
    if ai_response["adjustments"]&.dig("complexity")
      adjusted[:customization_level] = ai_response["adjustments"]["complexity"]
    end

    adjusted
  end

  def apply_ai_pricing_adjustments(pricing_data, ai_analysis)
    return pricing_data unless ai_analysis[:adjustments][:pricing_multiplier]

    multiplier = ai_analysis[:adjustments][:pricing_multiplier].to_f
    return pricing_data if multiplier < 0.5 || multiplier > 2.0 # Safety bounds

    adjusted_data = pricing_data.dup

    if adjusted_data[:estimated_cost]
      adjusted_data[:estimated_cost] *= multiplier
      adjusted_data[:base_cost] *= multiplier
      adjusted_data[:deposit_amount] *= multiplier
    end

    if adjusted_data[:monthly_fee]
      adjusted_data[:monthly_fee] *= multiplier
      adjusted_data[:bond_amount] *= multiplier
    end

    adjusted_data
  end

  def generate_time_to_mvp_marketing_text(months, priority)
    base_text = "Based on our experience delivering #{months} similar projects, we can confidently estimate your MVP will be ready in approximately #{months} month#{months == 1 ? '' : 's'}."

    case priority
    when "high"
      "#{base_text} With high priority, we'll expedite the development process to deliver 25% faster than our standard timeline."
    when "low"
      "#{base_text} With low priority, we'll take the time to perfect every detail, though this extends the timeline by 50%."
    else
      "#{base_text} This estimate is based on our proven track record of delivering similar projects on time and within budget."
    end
  end
end
