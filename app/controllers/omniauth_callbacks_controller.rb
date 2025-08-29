class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: "Google") if is_navigational_format?
    else
      session["devise.google_oauth2_data"] = request.env["omniauth.auth"].except("extra")
      redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
    end
  end

  def failure
    redirect_to root_path, alert: "Authentication failed, please try again."
  end

  private

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
