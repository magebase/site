class Tenant::ChangeRequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tenant

  def index
    @change_requests = @tenant.change_requests.order(created_at: :desc)
  end

  def new
    @change_request = @tenant.change_requests.new
  end

  def create
    @change_request = @tenant.change_requests.new(change_request_params)
    @change_request.user = current_user

    if @change_request.save
      redirect_to tenant_change_requests_path, notice: "Change request was successfully created."
    else
      render :new
    end
  end

  def show
    @change_request = @tenant.change_requests.find(params[:id])
  end

  def update
    @change_request = @tenant.change_requests.find(params[:id])

    if @change_request.update(change_request_params)
      redirect_to tenant_change_request_path(@change_request), notice: "Change request was successfully updated."
    else
      render :show
    end
  end

  private

  def set_tenant
    @tenant = current_user.tenants.find_by(subdomain: request.subdomain)
    unless @tenant
      redirect_to root_path, alert: "Tenant not found"
    end
  end

  def change_request_params
    params.require(:change_request).permit(:title, :description, :status, :priority)
  end
end
