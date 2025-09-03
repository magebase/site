# frozen_string_literal: true

# Security Headers Concern
# Provides methods for customizing security headers on a per-controller or per-action basis
module SecurityHeadersConcern
  extend ActiveSupport::Concern

  included do
    # Set default security headers for all actions
    before_action :set_security_headers
  end

  private

  # Set default security headers for the controller
  def set_security_headers
    # Use default configuration for most actions
    use_secure_headers_override(:default)
  end

  # Override security headers for API responses
  def use_api_headers
    use_secure_headers_override(:api)
  end

  # Override security headers for file downloads
  def use_download_headers
    SecureHeaders.override_content_security_policy_directive(
      self,
      :default_src,
      %w['self' https: blob:]
    )
    SecureHeaders.override_x_frame_options(self, "SAMEORIGIN")
  end

  # Override security headers for admin pages
  def use_admin_headers
    SecureHeaders.override_x_frame_options(self, "DENY")
    SecureHeaders.override_content_security_policy_directive(
      self,
      :script_src,
      %w['self' https: 'unsafe-inline' 'unsafe-eval']
    )
  end

  # Allow framing for specific trusted sources (use with caution)
  def allow_framing_from(sources)
    SecureHeaders.override_x_frame_options(self, "ALLOW-FROM #{sources.join(' ')}")
  end

  # Disable CSP for specific actions (use with extreme caution)
  def disable_csp
    SecureHeaders.override_content_security_policy(self, SecureHeaders::OPT_OUT)
  end

  # Add custom CSP directives
  def add_csp_directive(directive, sources)
    SecureHeaders.override_content_security_policy_directive(self, directive, sources)
  end

  # Example: Allow external scripts from trusted CDN
  def allow_external_scripts(sources)
    add_csp_directive(:script_src, sources)
  end

  # Example: Allow external styles from trusted CDN
  def allow_external_styles(sources)
    add_csp_directive(:style_src, sources)
  end

  # Example: Allow images from external sources
  def allow_external_images(sources)
    add_csp_directive(:img_src, sources)
  end
end
