class Tenant::ChangeRequestsController < ApplicationController
  include TenantPath  # Changed from TenantSubdomain to TenantPath
  before_action :authenticate_user!

  def index
    change_requests = current_tenant.change_requests.order(created_at: :desc)

    render inertia: 'Tenant/ChangeRequests/Index', props: {
      tenant: current_tenant.as_json(only: [:name, :subdomain]),
      changeRequests: change_requests.as_json(include: :user)
    }
  end

  def new
    change_request = current_tenant.change_requests.new

    render inertia: 'Tenant/ChangeRequests/New', props: {
      tenant: current_tenant.as_json(only: [:name, :subdomain]),
      changeRequest: change_request.as_json
    }
  end

  def create
    change_request = current_tenant.change_requests.new(change_request_params)
    change_request.user = current_user

    if change_request.save
      redirect_to tenant_change_requests_path, notice: 'Change request was successfully created.'
    else
      render inertia: 'Tenant/ChangeRequests/New', props: {
        tenant: current_tenant.as_json(only: [:name, :subdomain]),
        changeRequest: change_request.as_json,
        errors: change_request.errors.as_json
      }
    end
  end

  def show
    change_request = current_tenant.change_requests.find(params[:id])

    render inertia: 'Tenant/ChangeRequests/Show', props: {
      tenant: current_tenant.as_json(only: [:name, :subdomain]),
      changeRequest: change_request.as_json(include: :user)
    }
  end

  def update
    change_request = current_tenant.change_requests.find(params[:id])

    if change_request.update(change_request_params)
      redirect_to tenant_change_request_path(change_request), notice: 'Change request was successfully updated.'
    else
      render inertia: 'Tenant/ChangeRequests/Show', props: {
        tenant: current_tenant.as_json(only: [:name, :subdomain]),
        changeRequest: change_request.as_json(include: :user),
        errors: change_request.errors.as_json
      }
    end
  end

  private

  def change_request_params
    params.require(:change_request).permit(:title, :description, :status, :priority)
  end
end
