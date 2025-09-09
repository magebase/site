class ApplicationController < ActionController::Base
  # Skip CSRF protection for Inertia requests - we'll handle it manually
  skip_before_action :verify_authenticity_token, if: :should_skip_authenticity_token?

  before_action :authenticate_user!
  before_action :verify_inertia_csrf_token, if: :should_verify_inertia_csrf_token?
  before_action :debug_request
  after_action :set_xsrf_token_cookie

  # Handle CSRF token mismatches gracefully for Inertia requests
  rescue_from ActionController::InvalidAuthenticityToken, with: :inertia_page_expired_error

  # Share flash messages and CSRF token with Inertia
  inertia_share flash: -> { flash.to_hash }
  inertia_share csrf_token: -> { form_authenticity_token }

  private

  def debug_request
    Rails.logger.info "DEBUG: #{request.method} #{request.path} - Controller: #{controller_name}##{action_name}"
    Rails.logger.info "DEBUG: Headers - X-Inertia: #{request.headers['X-Inertia'].present? ? 'present' : 'missing'}"
    Rails.logger.info "DEBUG: Headers - X-XSRF-TOKEN: #{request.headers['X-XSRF-TOKEN'].present? ? 'present' : 'missing'}"
    Rails.logger.info "DEBUG: Headers - X-CSRF-TOKEN: #{request.headers['X-CSRF-TOKEN'].present? ? 'present' : 'missing'}"
    Rails.logger.info "DEBUG: Cookies - XSRF-TOKEN: #{cookies['XSRF-TOKEN'].present? ? 'present' : 'missing'}"
    Rails.logger.info "DEBUG: Inertia request? #{inertia_request?}"
  end

  def inertia_request?
    request.headers["X-Inertia"].present?
  end

  def should_verify_inertia_csrf_token?
    inertia_request? && !(controller_name == "quote_requests" && [ "create", "new" ].include?(action_name))
  end

  def should_skip_authenticity_token?
    inertia_request? && !(controller_name == "quote_requests" && [ "create", "new" ].include?(action_name))
  end

  def verify_inertia_csrf_token
    Rails.logger.info "DEBUG: CSRF Verification - X-Inertia: #{request.headers['X-Inertia'].present?}"
    Rails.logger.info "DEBUG: CSRF Verification - X-XSRF-TOKEN: #{request.headers['X-XSRF-TOKEN'].present?}"
    Rails.logger.info "DEBUG: CSRF Verification - X-CSRF-TOKEN: #{request.headers['X-CSRF-TOKEN'].present?}"
    Rails.logger.info "DEBUG: CSRF Verification - Cookie XSRF-TOKEN: #{cookies['XSRF-TOKEN'].present?}"

    # Check for X-XSRF-TOKEN header first (for Inertia requests)
    xsrf_token = request.headers["X-XSRF-TOKEN"]
    csrf_token = request.headers["X-CSRF-TOKEN"]

    if xsrf_token.present?
      # Verify X-XSRF-TOKEN (URL decoded)
      decoded_token = CGI.unescape(xsrf_token)
      Rails.logger.info "DEBUG: CSRF Verification - Decoded XSRF token matches? #{decoded_token == form_authenticity_token}"
      if decoded_token != form_authenticity_token
        Rails.logger.error "CSRF token mismatch - expected: #{form_authenticity_token}, got: #{decoded_token}"
        raise ActionController::InvalidAuthenticityToken
      end
    elsif csrf_token.present?
      # Verify X-CSRF-TOKEN
      Rails.logger.info "DEBUG: CSRF Verification - CSRF token matches? #{csrf_token == form_authenticity_token}"
      if csrf_token != form_authenticity_token
        Rails.logger.error "CSRF token mismatch - expected: #{form_authenticity_token}, got: #{csrf_token}"
        raise ActionController::InvalidAuthenticityToken
      end
    else
      # No token provided for Inertia request
      Rails.logger.error "No CSRF token provided for Inertia request"
      raise ActionController::InvalidAuthenticityToken
    end
  end

  def set_xsrf_token_cookie
    # Set the XSRF-TOKEN cookie for Inertia.js
    cookies["XSRF-TOKEN"] = {
      value: form_authenticity_token,
      secure: Rails.env.production?,
      same_site: :lax,
      httponly: false # Allow JavaScript access
    }
  end

  def authenticate_user!
    # Only require authentication for protected routes
    # This can be customized based on your needs
  end

  def after_sign_in_path_for(resource)
    # Check if user has tenants and redirect to the first one
    # if resource.tenants.any?
    #   tenant = resource.tenants.first
    #   tenant_dashboard_url(tenant)
    # else
    # If no tenants, redirect to client dashboard
    client_dashboard_path
    # end
  end

  def tenant_dashboard_url(tenant)
    "#{request.protocol}#{tenant.subdomain}.#{request.domain}#{request.port_string}/tenant/dashboard"
  end

  def inertia_page_expired_error
    redirect_back_or_to("/", allow_other_host: false, notice: "The page expired, please try again.")
  end
end
