class ProjectPlanningService
  def initialize(quote_request)
    @quote_request = quote_request
  end

  def generate_plan
    features = @quote_request.selected_features
    use_case = @quote_request.use_case

    # Get AI-enhanced project plan
    ai_plan = get_ai_project_plan

    # Generate project plan with AI insights
    project_plan = {
      timeline_months: ai_plan["timeline_months"] || calculate_timeline(features, use_case),
      milestones: ai_plan["milestones"] || generate_milestones(features, use_case),
      team_requirements: ai_plan["team_requirements"] || determine_team_requirements(features),
      technology_stack: ai_plan["technology_stack"] || recommend_technology_stack(use_case, features),
      risks_assumptions: ai_plan["risks"] ? merge_risks_and_assumptions(ai_plan["risks"], identify_risks_and_assumptions(features, use_case)) : identify_risks_and_assumptions(features, use_case),
      deliverables: define_deliverables(use_case, features),
      ai_enhanced: ai_plan.present?
    }

    @quote_request.update!(project_plan_json: project_plan)

    # Create project milestones in database
    create_project_milestones(project_plan[:milestones])

    # Associate selected features with the quote request
    associate_selected_features(features)
  end

  private

  def calculate_timeline(features, use_case)
    # Base timeline calculation
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

    # Adjust based on feature complexity
    complex_features = features.select { |f| [ "ai_ml", "blockchain", "real_time_features" ].include?(f.name) }.count
    feature_adjustment = features.count * 0.2

    (base_months + complex_features + feature_adjustment).ceil
  end

  def generate_milestones(features, use_case)
    milestones = []

    # Discovery and Planning
    milestones << {
      name: "Discovery & Requirements",
      description: "Gather detailed requirements, user research, and technical analysis",
      duration_weeks: 2,
      deliverables: [ "Requirements Document", "User Personas", "Technical Specification" ],
      order: 1
    }

    # Design Phase
    if features.any? { |f| f.name.include?("dashboard") || f.name.include?("mobile") }
      milestones << {
        name: "Design & Prototyping",
        description: "Create wireframes, mockups, and interactive prototypes",
        duration_weeks: 3,
        deliverables: [ "Wireframes", "UI/UX Designs", "Prototype" ],
        order: 2
      }
    end

    # Development Phases
    development_features = features.reject { |f| f.name == "maintenance_support" || f.name == "documentation" }

    if development_features.count > 0
      # Split development into phases if complex
      if development_features.count > 5
        mid_point = (development_features.count / 2.0).ceil
        first_half = development_features.first(mid_point)
        second_half = development_features.last(development_features.count - mid_point)

        milestones << {
          name: "Development Phase 1",
          description: "Implement core features: #{first_half.map(&:name).join(', ')}",
          duration_weeks: 4,
          deliverables: [ "Functional MVP", "Code Review" ],
          order: 3
        }

        milestones << {
          name: "Development Phase 2",
          description: "Implement advanced features: #{second_half.map(&:name).join(', ')}",
          duration_weeks: 4,
          deliverables: [ "Full Feature Set", "Integration Testing" ],
          order: 4
        }
      else
        milestones << {
          name: "Development",
          description: "Implement all features: #{development_features.map(&:name).join(', ')}",
          duration_weeks: 6,
          deliverables: [ "Complete Application", "Unit Tests" ],
          order: 3
        }
      end
    end

    # Testing and Deployment
    milestones << {
      name: "Testing & Deployment",
      description: "Comprehensive testing, bug fixes, and production deployment",
      duration_weeks: 2,
      deliverables: [ "Test Reports", "Production Deployment", "User Acceptance Testing" ],
      order: milestones.length + 1
    }

    # Support and Documentation
    if features.any? { |f| f.name == "documentation" || f.name == "maintenance_support" }
      milestones << {
        name: "Documentation & Handover",
        description: "Create documentation and provide knowledge transfer",
        duration_weeks: 1,
        deliverables: [ "Technical Documentation", "User Guides", "Knowledge Transfer" ],
        order: milestones.length + 1
      }
    end

    milestones
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
      project_manager: true # Always needed
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

    # If both frontend and backend are needed, consider fullstack
    if team[:frontend_developer] && team[:backend_developer] && !team[:mobile_developer]
      team[:fullstack_developer] = true
      team[:frontend_developer] = false
      team[:backend_developer] = false
    end

    team
  end

  def recommend_technology_stack(use_case, features)
    stack = {
      frontend: [],
      backend: [],
      database: [],
      infrastructure: [],
      tools: []
    }

    # Frontend recommendations
    if features.any? { |f| f.name == "mobile_app" }
      stack[:frontend] << "React Native"
    else
      stack[:frontend] << "React"
      stack[:frontend] << "TypeScript"
    end

    # Backend recommendations
    case use_case
    when "ai_ml"
      stack[:backend] << "Python"
      stack[:backend] << "FastAPI"
      stack[:database] << "PostgreSQL"
    when "blockchain"
      stack[:backend] << "Node.js"
      stack[:backend] << "Express"
      stack[:database] << "MongoDB"
    else
      stack[:backend] << "Ruby on Rails"
      stack[:database] << "PostgreSQL"
    end

    # Additional tools
    stack[:tools] << "Git"
    stack[:tools] << "Docker"
    stack[:infrastructure] << "AWS/GCP/Azure"

    if features.any? { |f| f.name == "real_time_features" }
      stack[:infrastructure] << "Redis"
      stack[:tools] << "WebSocket"
    end

    stack
  end

  def identify_risks_and_assumptions(features, use_case)
    risks = []
    assumptions = []

    # Common risks and assumptions
    assumptions << "Client will provide timely feedback during development"
    assumptions << "Third-party APIs will be available and stable"
    risks << "Scope creep from additional feature requests"
    risks << "Third-party service outages affecting functionality"

    # Use case specific
    case use_case
    when "ai_ml"
      risks << "AI model training may require more data than initially provided"
      assumptions << "Client has sufficient data for AI model training"
    when "blockchain"
      risks << "Cryptocurrency market volatility may affect project timeline"
      assumptions << "Client understands blockchain technology requirements"
    when "marketplace"
      risks << "Payment processor approval may delay launch"
      assumptions << "Client has necessary business licenses"
    end

    # Feature specific
    if features.any? { |f| f.name == "payment_processing" }
      risks << "Payment processor compliance requirements may add complexity"
      assumptions << "Client has merchant account or can obtain one"
    end

    if features.any? { |f| f.name == "third_party_integrations" }
      risks << "Third-party API changes may require code modifications"
      assumptions << "Client has necessary API credentials and access"
    end

    { risks: risks, assumptions: assumptions }
  end

  def define_deliverables(use_case, features)
    deliverables = [
      "Source Code Repository",
      "Database Schema",
      "API Documentation",
      "Deployment Guide"
    ]

    # Use case specific deliverables
    case use_case
    when "mobile_app"
      deliverables << "Mobile App Store Listings"
      deliverables << "App Icons and Screenshots"
    when "ecommerce"
      deliverables << "Product Catalog Setup"
      deliverables << "Payment Gateway Configuration"
    when "saas"
      deliverables << "Subscription Management System"
      deliverables << "Admin Dashboard"
    end

    # Feature specific deliverables
    if features.any? { |f| f.name == "documentation" }
      deliverables << "User Documentation"
      deliverables << "Technical Documentation"
    end

    if features.any? { |f| f.name == "testing_qa" }
      deliverables << "Test Suite"
      deliverables << "Test Reports"
    end

    deliverables
  end

  def associate_selected_features(features)
    features.each do |feature|
      @quote_request.quote_request_features.find_or_create_by!(feature: feature)
    end
  end

  def create_project_milestones(milestones)
    return unless milestones.present?

    milestones.each do |milestone|
      @quote_request.project_milestones.create!(
        name: milestone[:name],
        description: milestone[:description],
        due_date: calculate_milestone_due_date(milestone[:order]),
        status: "pending",
        milestone_data: milestone.except(:name, :description)
      )
    end
  end

  def calculate_milestone_due_date(order)
    # Calculate due date based on milestone order
    # Assuming 2 weeks per milestone phase
    weeks_from_now = order * 2
    Date.current + weeks_from_now.weeks
  end

  private

  def get_ai_project_plan
    return {} unless ENV["GOOGLE_STUDIO_API_KEY"].present? || ENV["OPENAI_API_KEY"].present? || ENV["ANTHROPIC_API_KEY"].present?

    begin
      llm_service = LlmService.new
      llm_service.generate_project_plan(@quote_request)
    rescue => e
      Rails.logger.error("AI project planning failed: #{e.message}")
      {}
    end
  end

  def merge_risks_and_assumptions(ai_risks, traditional_risks_assumptions)
    {
      risks: (ai_risks + traditional_risks_assumptions[:risks]).uniq,
      assumptions: traditional_risks_assumptions[:assumptions]
    }
  end
end
