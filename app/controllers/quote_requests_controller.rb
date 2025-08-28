class QuoteRequestsController < ApplicationController
  def index
    @quote_requests = QuoteRequest.includes(:client).order(created_at: :desc)
    render inertia: 'QuoteRequests/Index', props: {
      quote_requests: @quote_requests.as_json(include: :client)
    }
  end

  def show
    @quote_request = QuoteRequest.includes(:client, :selected_features, :project_milestones, :contract, :payments).find(params[:id])
    render inertia: 'QuoteRequests/Show', props: {
      quote_request: @quote_request.as_json(
        include: [:client, :selected_features, :project_milestones, :contract, :payments]
      )
    }
  end

  def new
    @quote_request = QuoteRequest.new
    @features = Feature.all.order(:category, :name)
    render inertia: 'QuoteRequests/New', props: {
      quote_request: @quote_request.as_json,
      features: @features.as_json
    }
  end

  def create
    # Handle client creation/finding
    client_params = params[:quote_request].slice(:client_name, :client_email, :client_phone)
    if client_params[:client_email].present?
      client = Client.find_or_create_by!(email: client_params[:client_email]) do |c|
        c.company_name = client_params[:client_name]
        c.contact_name = client_params[:client_name]
        c.phone = client_params[:client_phone]
      end
    end

    # Create quote request with client association
    quote_request_data = quote_request_params.except(:feature_ids, :client_name, :client_email, :client_phone)
    quote_request_data[:client_id] = client&.id

    @quote_request = QuoteRequest.new(quote_request_data)

    if @quote_request.save
      # Associate selected features
      if params[:quote_request][:feature_ids].present?
        feature_ids = params[:quote_request][:feature_ids].map(&:to_i)
        features = Feature.where(id: feature_ids)
        @quote_request.selected_features = features
      end

      # Trigger AI pricing and project planning
      PricingService.new(@quote_request).calculate_price
      ProjectPlanningService.new(@quote_request).generate_plan

      render json: {
        success: true,
        message: 'Quote request submitted successfully!',
        quote_request: @quote_request.as_json(include: :selected_features)
      }, status: :created
    else
      render json: {
        success: false,
        errors: @quote_request.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    @quote_request = QuoteRequest.find(params[:id])

    if @quote_request.update(quote_request_params)
      render json: {
        success: true,
        message: 'Quote request updated successfully!',
        quote_request: @quote_request.as_json
      }
    else
      render json: {
        success: false,
        errors: @quote_request.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def generate_quote
    @quote_request = QuoteRequest.find(params[:id])
    @quote_request.generate_quote!

    render json: {
      success: true,
      message: 'Quote generated successfully!',
      quote_request: @quote_request.as_json
    }
  end

  def accept_quote
    @quote_request = QuoteRequest.find(params[:id])
    @quote_request.accept_quote!

    # Generate contract
    ContractGenerationService.new(@quote_request).generate_contract

    render json: {
      success: true,
      message: 'Quote accepted! Contract generated.',
      quote_request: @quote_request.as_json(include: :contract)
    }
  end

  def timeline_pdf
    @quote_request = QuoteRequest.find(params[:id])
    render inertia: 'QuoteRequests/TimelinePdf', props: {
      quote_request: @quote_request.as_json(
        include: [:client, :selected_features, :project_milestones, :contract, :payments]
      )
    }
  end

  def timeline_csv
    @quote_request = QuoteRequest.find(params[:id])

    # Generate CSV content
    require 'csv'
    csv_data = generate_timeline_csv(@quote_request)

    send_data csv_data,
              filename: "#{@quote_request.project_name.parameterize}_timeline.csv",
              type: 'text/csv',
              disposition: 'attachment'
  end

  private

  def generate_pdf
    @quote_request = QuoteRequest.find(params[:id])

    # Generate PDF
    pdf_generator = QuotePdfGenerator.new(@quote_request)
    pdf_data = pdf_generator.generate.render

    # Send email with PDF attachment (async)
    QuoteEmailJob.perform_later(@quote_request.id, pdf_data)

    # Return PDF for download
    send_data pdf_data,
              filename: "scope-document-#{@quote_request.id}.pdf",
              type: 'application/pdf',
              disposition: 'attachment'
  end

  def generate_timeline_csv(quote_request)
    timeline = quote_request.project_plan_json&.dig('timeline') || []

    CSV.generate(headers: true) do |csv|
      csv << ['Project Name', 'Client Company', 'Client Contact', 'Client Email', 'Day', 'Scope', 'Deliverables', 'Estimated Cost', 'Monthly Retainer', 'Deposit Amount', 'Status', 'Created Date']

      timeline.each do |item|
        csv << [
          quote_request.project_name,
          quote_request.client.company_name,
          quote_request.client.contact_name,
          quote_request.client.email,
          item['day'],
          item['scope'],
          item['deliverables']&.join('; '),
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
      :project_name,
      :project_description,
      :use_case,
      :estimated_cost,
      :monthly_retainer,
      :deposit_amount,
      :feature_ids,
      :client_name,
      :client_email,
      :client_phone,
      :inspiration,
      selected_features_json: {},
      ai_pricing_json: {},
      project_plan_json: {},
      selected_languages: [],
      selected_social_providers: []
    )
  end
end
