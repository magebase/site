class ProposalsController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    @quote_request = QuoteRequest.friendly.find(params[:slug])

    # Check if permalink is expired
    if @quote_request.permalink_expired?
      render inertia: "Proposals/Expired", props: {
        message: "This proposal link has expired. Please contact us for a new link."
      }
      return
    end

    # Only allow viewing if the quote is in quoted state
    unless @quote_request.quoted?
      redirect_to root_path, alert: "This proposal is not yet available."
      return
    end

    render inertia: "Proposals/Show", props: {
      quote_request: @quote_request.as_json(
        include: [ :client, :selected_features, :project_milestones ]
      ),
      proposal_slug: params[:slug]
    }
  end

  def accept
    @quote_request = QuoteRequest.friendly.find(params[:slug])

    if @quote_request.permalink_expired?
      redirect_to root_path, alert: "This proposal link has expired."
      return
    end

    if @quote_request.accept_quote!
      # Generate contract
      ContractGenerationService.new(@quote_request).generate_contract

      # Create or find user account for the client
      create_user_account_and_send_magic_link(@quote_request)

      redirect_to root_path, notice: "Quote accepted successfully! Check your email for your account access link."
    else
      redirect_to proposal_path(slug: params[:slug]), alert: "Failed to accept quote. Please try again."
    end
  end

  private

  def create_user_account_and_send_magic_link(quote_request)
    return unless quote_request.client&.email.present?

    # Find or create user account
    user = User.find_or_create_by!(email: quote_request.client.email) do |u|
      u.password = Devise.friendly_token[0, 20]
      u.name = quote_request.client.contact_name || quote_request.client.company_name
    end

    # Send welcome magic link email
    user.send_magic_link_email(true) # true = welcome message
  end
end
