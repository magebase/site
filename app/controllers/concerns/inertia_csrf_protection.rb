module InertiaCsrfProtection
  extend ActiveSupport::Concern

  included do
    # Override the default CSRF protection for Inertia requests
    protect_from_forgery with: :inertia_csrf_protection
  end

  private

  def inertia_csrf_protection
    # For Inertia requests, check X-XSRF-TOKEN header
    if inertia_request?
      xsrf_token = request.headers["X-XSRF-TOKEN"]
      csrf_token = request.headers["X-CSRF-TOKEN"]

      if xsrf_token.present?
        # Verify X-XSRF-TOKEN
        verify_xsrf_token(xsrf_token)
      elsif csrf_token.present?
        # Verify X-CSRF-TOKEN
        verify_csrf_token(csrf_token)
      else
        # No token provided
        raise ActionController::InvalidAuthenticityToken
      end
    else
      # Use default protection for non-Inertia requests
      default_csrf_protection
    end
  end

  def inertia_request?
    request.headers["X-Inertia"].present?
  end

  def verify_xsrf_token(token)
    # Decode the token if it's URL-encoded
    decoded_token = CGI.unescape(token)

    # Compare with the expected token
    if decoded_token == form_authenticity_token
      # Valid token
      true
    else
      raise ActionController::InvalidAuthenticityToken
    end
  end

  def verify_csrf_token(token)
    # For X-CSRF-TOKEN, compare directly
    if token == form_authenticity_token
      true
    else
      raise ActionController::InvalidAuthenticityToken
    end
  end

  def default_csrf_protection
    # Use Rails' default CSRF protection
    if request.headers["X-CSRF-TOKEN"].present?
      verify_csrf_token(request.headers["X-CSRF-TOKEN"])
    else
      raise ActionController::InvalidAuthenticityToken
    end
  end
end
