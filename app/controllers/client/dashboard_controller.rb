class Client::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    # Find all quote requests associated with this client's email
    client_email = current_user.email
    @quote_requests = QuoteRequest.joins(:client)
                                  .where(clients: { email: client_email })
                                  .includes(:client, :selected_features, :project_milestones)
                                  .order(created_at: :desc)

    # Get the tenant for this client if they have one
    @tenant = current_user.tenants.first

    render inertia: 'Client/Dashboard', props: {
      quoteRequests: @quote_requests.as_json(
        include: [:client, :selected_features, :project_milestones, :tenant]
      ),
      tenant: @tenant&.as_json(only: [:name, :subdomain]),
      currentUser: current_user.as_json(only: [:name, :email])
    }
  end
end
