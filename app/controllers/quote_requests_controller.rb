class QuoteRequestsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :create, :new ]
  skip_before_action :verify_inertia_csrf_token, only: [ :create, :new ]
  skip_before_action :verify_authenticity_token, only: [ :create, :new ]
  def index
    @quote_requests = QuoteRequest.includes(:client).order(created_at: :desc)
    render inertia: "QuoteRequests/Index", props: {
      quote_requests: @quote_requests.as_json(include: :client)
    }
  end

  def show
    @quote_request = QuoteRequest.includes(:client, :selected_features, :project_milestones, :contract, :payments).find(params[:id])
    render inertia: "QuoteRequests/Show", props: {
      quote_request: @quote_request.as_json(
        include: [ :client, :selected_features, :project_milestones, :contract, :payments ]
      )
    }
  end

  def new
    @quote_request = QuoteRequest.new
    @features = Feature.all.order(:category, :name)
    render inertia: "QuoteRequests/New", props: {
      quote_request: @quote_request.as_json,
      features: @features.as_json
    }
  end

  def create
    puts "DEBUG: QuoteRequestsController#create - START"
    puts "Raw params: #{params[:quote_request].inspect}"

    # Clean up the parameters mapping
    cleaned_params = clean_quote_request_params(params[:quote_request])
    puts "Cleaned params: #{cleaned_params.inspect}"

    @quote_request = QuoteRequest.new(cleaned_params)
    puts "Quote request object created: #{@quote_request.inspect}"
    puts "Quote request valid? #{@quote_request.valid?}"
    puts "Quote request errors: #{@quote_request.errors.full_messages}" unless @quote_request.valid?

    if @quote_request.save
      puts "Quote request saved successfully!"
      puts "Quote request ID: #{@quote_request.id}"

      # Create or find client
      client = Client.find_or_create_by!(email: @quote_request.email) do |c|
        c.contact_name = @quote_request.name
        c.company_name = params[:quote_request][:companyName]
        c.phone = @quote_request.phone
      end
      @quote_request.update!(client: client)

      render inertia: "QuoteRequests/Show", props: {
        quote_request: @quote_request.as_json(include: :client),
        success: true,
        message: "Quote request submitted successfully!"
      }
    else
      puts "Quote request save failed!"
      puts "Errors: #{@quote_request.errors.full_messages}"

      # Return a structured Inertia-style JSON payload so the client (Inertia
      # useForm) can read the errors and props without rendering a full page.
      @features = Feature.all.order(:category, :name)

      redirect_to "/", inertia: {
            errors: @quote_request.errors
      }
    end
  end

  def update
    @quote_request = QuoteRequest.find(params[:id])

    if @quote_request.update(quote_request_params)
      render inertia: "QuoteRequests/Show", props: {
        quote_request: @quote_request.as_json,
        success: true,
        message: "Quote request updated successfully!"
      }
    else
      render inertia: "QuoteRequests/Show", props: {
        quote_request: @quote_request.as_json,
        errors: @quote_request.errors.full_messages
      }
    end
  end

  def generate_quote
    @quote_request = QuoteRequest.find(params[:id])
    @quote_request.generate_quote!

    # Create draft Stripe invoice
    StripeInvoiceService.new(@quote_request).create_draft_invoice

    # Send Discord notification for approved quote
    DiscordNotificationJob.perform_later("quote_approved", @quote_request.id)

    render inertia: "QuoteRequests/Show", props: {
      quote_request: @quote_request.as_json,
      success: true,
      message: "Quote generated successfully!"
    }
  end

  def accept_quote
    @quote_request = QuoteRequest.find(params[:id])
    @quote_request.accept_quote!

    # Generate contract
    ContractGenerationService.new(@quote_request).generate_contract

    render inertia: "QuoteRequests/Show", props: {
      quote_request: @quote_request.as_json(include: :contract),
      success: true,
      message: "Quote accepted! Contract generated."
    }
  end

  def timeline_pdf
    @quote_request = QuoteRequest.find(params[:id])
    render inertia: "QuoteRequests/TimelinePdf", props: {
      quote_request: @quote_request.as_json(
        include: [ :client, :selected_features, :project_milestones, :contract, :payments ]
      )
    }
  end

  def timeline_csv
    @quote_request = QuoteRequest.find(params[:id])

    # Generate CSV content
    require "csv"
    csv_data = generate_timeline_csv(@quote_request)

    send_data csv_data,
              filename: "#{@quote_request.project_name.parameterize}_timeline.csv",
              type: "text/csv",
              disposition: "attachment"
  end

  private

  def clean_quote_request_params(raw_params)
    # Map frontend parameter names to model attributes
    cleaned = {}

    # Basic mappings
    cleaned[:name] = raw_params[:name] if raw_params[:name]
    cleaned[:email] = raw_params[:email] if raw_params[:email]
    cleaned[:phone] = raw_params[:phone] if raw_params[:phone]
    cleaned[:use_case] = raw_params[:useCase] if raw_params[:useCase]
    cleaned[:project_name] = raw_params[:projectName] if raw_params[:projectName]
    cleaned[:estimated_cost] = raw_params[:estimatedCost] if raw_params[:estimatedCost]
    cleaned[:inspiration] = raw_params[:inspiration] if raw_params[:inspiration]

    # Handle special requirements as project description if it's clean
    if raw_params[:specialRequirements] &&
       !raw_params[:specialRequirements].include?("Started POST")
      cleaned[:project_description] = raw_params[:specialRequirements]
    end

    # Handle selected features
    if raw_params[:selectedFeatures]
      cleaned[:selected_features_json] = { features: raw_params[:selectedFeatures] }
    end

    # Handle languages
    if raw_params[:selectedLanguages]
      cleaned[:selected_languages] = raw_params[:selectedLanguages]
    end

    # Handle social providers
    if raw_params[:selectedSocialProviders]
      cleaned[:selected_social_providers] = raw_params[:selectedSocialProviders]
    end

    # Store additional metadata
    metadata = {}
    metadata[:company_name] = raw_params[:companyName] if raw_params[:companyName]
    metadata[:velocity] = raw_params[:velocity] if raw_params[:velocity]
    metadata[:delivery_address] = raw_params[:deliveryAddress] if raw_params[:deliveryAddress]
    metadata[:redesign_count] = raw_params[:redesignCount] if raw_params[:redesignCount]
    metadata[:customization_level] = raw_params[:customizationLevel] if raw_params[:customizationLevel]
    metadata[:integration_complexity] = raw_params[:integrationComplexity] if raw_params[:integrationComplexity]
    metadata[:pricing_model] = raw_params[:pricingModel] if raw_params[:pricingModel]

    if metadata.any?
      cleaned[:ai_pricing_json] = metadata
    end

    cleaned
  end

  def create_or_find_client_tenant(client)
    return unless client&.email.present?

    # Create a tenant name from client company or contact name
    tenant_name = client.company_name.presence || client.contact_name.presence || "Client Project"
    subdomain = generate_unique_subdomain(tenant_name)

    # Find or create user account for client
    user = User.find_or_create_by!(email: client.email) do |u|
      u.name = client.contact_name || client.company_name
      u.password = SecureRandom.hex(16) # Generate a random password
      u.password_confirmation = u.password
    end

    # Create tenant if user doesn't have one
    unless user.tenants.exists?
      tenant = user.tenants.create!(
        name: tenant_name,
        subdomain: subdomain
      )

      # Associate the quote request with the tenant (only if not already set)
      if @quote_request.persisted? && @quote_request.tenant_id.nil?
        @quote_request.update(tenant_id: tenant.id)
      end
    end
  end

  def generate_unique_subdomain(base_name)
    # Clean the name and create a subdomain
    subdomain = base_name.downcase.gsub(/[^a-z0-9]/, "")

    # Ensure uniqueness
    original_subdomain = subdomain
    counter = 1
    while Tenant.exists?(subdomain: subdomain)
      subdomain = "#{original_subdomain}#{counter}"
      counter += 1
    end

    subdomain
  end

  def send_proposal_ready_email(quote_request)
    return unless quote_request.client&.email.present?
    return if Rails.env.test? # Skip email sending in test environment

    # Send email with public proposal link
    ProposalReadyEmailService.send_proposal_ready_email(quote_request)
  end

  def generate_timeline_csv(quote_request)
    timeline = quote_request.project_plan_json&.dig("timeline") || []

    CSV.generate(headers: true) do |csv|
      csv << [ "Project Name", "Client Company", "Client Contact", "Client Email", "Day", "Scope", "Deliverables", "Estimated Cost", "Monthly Retainer", "Deposit Amount", "Status", "Created Date" ]

      timeline.each do |item|
        csv << [
          quote_request.project_name,
          quote_request.client.company_name,
          quote_request.client.contact_name,
          quote_request.client.email,
          item["day"],
          item["scope"],
          item["deliverables"]&.join("; "),
          quote_request.estimated_cost,
          quote_request.monthly_retainer,
          quote_request.deposit_amount,
          quote_request.status,
          quote_request.created_at
        ]
      end
    end
  end

  def quote_request_params
    params.require(:quote_request).permit(
      :name,                    # Client name
      :email,                   # Client email
      :phone,                   # Client phone
      :companyName,             # This might need to be mapped differently
      :project_name,
      :project_description,
      :use_case,
      :estimated_cost,
      :monthly_retainer,
      :deposit_amount,
      :inspiration,
      :specialRequirements,     # This might be project_description
      :velocity,                # Delivery velocity
      :deliveryAddress,         # Delivery address
      :redesignCount,           # Number of redesigns
      :customizationLevel,      # Level of customization
      :integrationComplexity,   # Integration complexity
      :pricingModel,            # Pricing model preference
      selected_features: [],    # Array of selected features
      selectedFeatures: [],     # Alternative field name
      selected_features_json: {},
      ai_pricing_json: {},
      project_plan_json: {},
      selected_languages: [],
      selectedLanguages: [],    # Alternative field name
      selected_social_providers: [],
      selectedSocialProviders: [] # Alternative field name
    )
  end
end
