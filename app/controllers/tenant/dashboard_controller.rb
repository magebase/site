require_dependency Rails.root.join('app/controllers/concerns/tenant_subdomain')

class Tenant::DashboardController < ApplicationController
  include TenantPath  # Changed from TenantSubdomain to TenantPath
  before_action :authenticate_user!

  def index
    change_requests = current_tenant.change_requests.order(created_at: :desc).limit(5)
    documents = current_tenant.documents.order(created_at: :desc).limit(10)
    recent_activity = (change_requests + documents).sort_by(&:created_at).reverse.first(10)

    render inertia: 'Tenant/Dashboard', props: {
      tenant: current_tenant.as_json(only: [:name, :subdomain]),
      changeRequests: change_requests.as_json(include: :user),
      documents: documents.as_json(include: :user),
      recentActivity: recent_activity.as_json(include: :user)
    }
  end
end
