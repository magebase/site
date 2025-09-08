class ApplicationController < ActionController::Base
  set_current_tenant_through_filter # Required to opt into this behavior
  before_action :authenticate_user!
  before_action :set_current_tenant

  private

  def authenticate_user!
    # Only require authentication for protected routes
    # This can be customized based on your needs
  end

  def set_current_tenant
    # Set the current tenant for activerecord-multi-tenant
    if defined?(current_tenant) && current_tenant
      set_current_tenant(current_tenant)
    end
  end

  def after_sign_in_path_for(resource)
    # Check if user has tenants and redirect to the first one
    if resource.tenants.any?
      tenant = resource.tenants.first
      tenant_dashboard_url(tenant)
    else
      # If no tenants, redirect to client dashboard
      client_dashboard_path
    end
  end

  def tenant_dashboard_url(tenant)
    "#{request.protocol}#{tenant.subdomain}.#{request.domain}#{request.port_string}/tenant/dashboard"
  end
end
