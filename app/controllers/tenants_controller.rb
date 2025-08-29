class TenantsController < ApplicationController
  before_action :authenticate_user!

  def new
    render inertia: "TenantNew"
  end

  def create
    @tenant = current_user.tenants.new(tenant_params)

    if @tenant.save
      redirect_to tenant_dashboard_path(subdomain: @tenant.subdomain), notice: "Tenant was successfully created."
    else
      render inertia: "TenantNew", props: {
        errors: @tenant.errors.as_json
      }
    end
  end

  private

  def tenant_params
    params.require(:tenant).permit(:name, :subdomain)
  end
end
