class LlmService
  PROVIDERS = {
    google: :google_studio,
    openai: :openai,
    anthropic: :anthropic
  }.freeze

  MODELS = {
    google: "gemini-pro",
    openai: "gpt-4",
    anthropic: "claude-3-sonnet-20240229"
  }.freeze

  def initialize(provider = nil)
    @provider = provider&.to_sym || default_provider
    validate_provider!
  end

  def complete(prompt, options = {})
    client = RubyLLM.client(provider: PROVIDERS[@provider])
    model = options[:model] || MODELS[@provider]

    client.complete(prompt, model: model, **options)
  end

  def chat(messages, options = {})
    client = RubyLLM.client(provider: PROVIDERS[@provider])
    model = options[:model] || MODELS[@provider]

    client.chat(messages, model: model, **options)
  end

  def generate_pricing_analysis(features, use_case)
    prompt = build_pricing_prompt(features, use_case)

    response = complete(prompt, {
      temperature: 0.3,
      max_tokens: 1000
    })

    parse_pricing_response(response)
  end

  def generate_contract_terms(quote_request)
    prompt = build_contract_prompt(quote_request)

    response = complete(prompt, {
      temperature: 0.2,
      max_tokens: 2000
    })

    parse_contract_response(response)
  end

  def generate_project_plan(quote_request)
    prompt = build_project_plan_prompt(quote_request)

    response = complete(prompt, {
      temperature: 0.4,
      max_tokens: 3000
    })

    parse_project_plan_response(response)
  end

  private

  def default_provider
    ENV["DEFAULT_LLM_PROVIDER"]&.to_sym || :google
  end

  def validate_provider!
    unless PROVIDERS.key?(@provider)
      raise ArgumentError, "Unsupported LLM provider: #{@provider}. Supported providers: #{PROVIDERS.keys.join(', ')}"
    end
  end

  def build_pricing_prompt(features, use_case)
    # Build pricing analysis prompt
    <<~PROMPT
    Analyze the following software development project and provide pricing recommendations:

    Use Case: #{use_case}
    Features: #{features.map(&:name).join(', ')}

    Please provide:
    1. Base development cost estimate
    2. Complexity multiplier based on features
    3. Timeline adjustment factor
    4. Recommended pricing structure

    Format your response as JSON with the following structure:
    {
      "base_cost": 50000,
      "complexity_multiplier": 1.3,
      "timeline_adjustment": 1.1,
      "monthly_retainer_percentage": 0.15,
      "deposit_percentage": 0.3,
      "justification": "Brief explanation of the pricing rationale"
    }
    PROMPT
  end

  def build_contract_prompt(quote_request)
    # Build contract generation prompt
    <<~PROMPT
    Generate professional contract terms for the following project:

    Project: #{quote_request.project_name}
    Use Case: #{quote_request.use_case}
    Estimated Cost: $#{quote_request.estimated_cost}
    Timeline: #{quote_request.project_plan_json['timeline_months']} months

    Please generate comprehensive contract terms including:
    1. Project scope and deliverables
    2. Timeline and milestones
    3. Payment terms and schedule
    4. Intellectual property rights
    5. Confidentiality and non-disclosure
    6. Termination clauses
    7. Warranty and support terms

    Format as structured contract clauses.
    PROMPT
  end

  def build_project_plan_prompt(quote_request)
    # Build project planning prompt
    <<~PROMPT
    Create a detailed project plan for the following software development project:

    Project: #{quote_request.project_name}
    Use Case: #{quote_request.use_case}
    Features: #{quote_request.selected_features.map(&:name).join(', ')}

    Please provide:
    1. Timeline estimation in months
    2. Development milestones with deliverables
    3. Team requirements and roles
    4. Technology stack recommendations
    5. Risk assessment and mitigation strategies
    6. Quality assurance approach

    Format your response as JSON with the following structure:
    {
      "timeline_months": 3,
      "milestones": [
        {
          "name": "Planning & Design",
          "duration_weeks": 2,
          "deliverables": ["Requirements document", "System design"]
        }
      ],
      "team_requirements": {
        "frontend_developer": 1,
        "backend_developer": 1,
        "designer": 1
      },
      "technology_stack": {
        "frontend": ["React", "TypeScript"],
        "backend": ["Rails", "PostgreSQL"],
        "deployment": ["Docker", "AWS"]
      },
      "risks": ["Technical complexity", "Timeline constraints"],
      "qa_approach": "Automated testing with manual QA"
    }
    PROMPT
  end

  def parse_pricing_response(response)
    # Parse and validate pricing response
    begin
      JSON.parse(response.content)
    rescue JSON::ParseError
      default_pricing_response
    end
  end

  def parse_contract_response(response)
    # Parse contract response into structured format
    response.content.split("\n\n").map do |section|
      lines = section.split("\n")
      {
        title: lines.first&.gsub(/^#+\s*/, ""),
        content: lines[1..]&.join("\n")
      }
    end
  end

  def parse_project_plan_response(response)
    # Parse and validate project plan response
    begin
      JSON.parse(response.content)
    rescue JSON::ParseError
      default_project_plan_response
    end
  end

  def default_pricing_response
    {
      "base_cost" => 50000,
      "complexity_multiplier" => 1.0,
      "timeline_adjustment" => 1.0,
      "monthly_retainer_percentage" => 0.15,
      "deposit_percentage" => 0.3,
      "justification" => "Default pricing due to analysis error"
    }
  end

  def default_project_plan_response
    {
      "timeline_months" => 3,
      "milestones" => [],
      "team_requirements" => {},
      "technology_stack" => {},
      "risks" => [],
      "qa_approach" => "Standard QA process"
    }
  end
end
