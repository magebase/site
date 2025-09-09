class Tenant::BillingController < ApplicationController
  include TenantPath  # Changed from TenantSubdomain to TenantPath
  before_action :authenticate_user!

  def index
    billing_service = StripeBillingService.new(current_tenant)

    # Get billing overview
    billing_data = billing_service.billing_overview

    # Get all available products for accordions
    available_products = billing_service.all_available_products

    # Prepare props for React component
    props = {
      tenant: current_tenant.as_json(only: [ :name, :subdomain ]),
      tenantPath: params[:tenant_name], # The actual path identifier used in URLs
      billingData: billing_data || {
        subscriptions: [],
        invoices: [],
        total_monthly: 0,
        next_billing_date: nil,
        subscription_count: 0
      },
      availableProducts: available_products,
      portalBaseUrl: request.base_url
    }

    render inertia: "Tenant/Billing/Index", props: props
  end

  def create_portal_session
    billing_service = StripeBillingService.new(current_tenant)
    return_url = params[:return_url] || "/#{params[:tenant_name]}/billing"

    portal_url = billing_service.create_portal_session(return_url)

    if portal_url
      render json: { portal_url: portal_url }
    else
      render json: { error: "Failed to create portal session" }, status: :unprocessable_entity
    end
  end

  def create_product_portal_session
    billing_service = StripeBillingService.new(current_tenant)
    product_id = params[:product_id]
    return_url = params[:return_url] || "/#{params[:tenant_name]}/billing"

    portal_url = billing_service.create_product_portal_session(product_id, return_url)

    if portal_url
      render json: { portal_url: portal_url }
    else
      render json: { error: "Failed to create portal session" }, status: :unprocessable_entity
    end
  end

  private

  def current_tenant
    @current_tenant ||= Tenant.find_by!(subdomain: params[:tenant_name])
  end
end
