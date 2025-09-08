module TenantSubdomain
  extend ActiveSupport::Concern

  included do
    before_action :set_tenant_from_subdomain
    helper_method :current_tenant
  end

  private

  def set_tenant_from_subdomain
    if request.subdomain.present? && request.subdomain != "www"
      @current_tenant = Tenant.find_by(subdomain: request.subdomain)
      unless @current_tenant
        redirect_to root_url(subdomain: false), alert: "Tenant not found"
      end
    else
      redirect_to root_url(subdomain: false), alert: "Invalid tenant access"
    end
  end

  def current_tenant
    @current_tenant
  end
end

# New concern for path-based tenant routing
module TenantPath
  extend ActiveSupport::Concern

  included do
    before_action :set_tenant_from_path_param
    helper_method :current_tenant
  end

  private

  def set_tenant_from_path_param
    tenant_name = params[:tenant_name]
    if tenant_name.present?
      @current_tenant = Tenant.find_by(name: tenant_name) || Tenant.find_by(subdomain: tenant_name)
      if @current_tenant
        # Set the current tenant for multi_tenant
        MultiTenant.current_tenant = @current_tenant
      else
        redirect_to root_path, alert: "Tenant not found"
      end
    else
      redirect_to root_path, alert: "Invalid tenant access"
    end
  end

  def current_tenant
    @current_tenant
  end
end
