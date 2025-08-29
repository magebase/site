class Tenant::BillingController < ApplicationController
  include TenantPath  # Changed from TenantSubdomain to TenantPath
  before_action :authenticate_user!

  def index
    # This would integrate with Stripe to show customer portal
    billing_info = {
      current_plan: "Professional",
      next_billing_date: 30.days.from_now,
      monthly_cost: 299.99
    }

    render inertia: "Tenant/Billing/Index", props: {
      tenant: current_tenant.as_json(           only: [ :name, :subdomai n ]),
      billingInfo: billing_in f o    }
end
end
