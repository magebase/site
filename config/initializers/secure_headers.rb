# frozen_string_literal: true

# Secure Headers Configuration
# https://github.com/github/secure_headers

SecureHeaders::Configuration.default do |config|
  # Cookie security settings
  config.cookies = {
    secure: true,    # Mark all cookies as "Secure"
    httponly: true,  # Mark all cookies as "HttpOnly"
    samesite: {
      lax: true      # Mark all cookies as SameSite=lax
    }
  }

  # HTTP Strict Transport Security (HSTS)
  # Add "; preload" and submit to hstspreload.org for best protection
  config.hsts = "max-age=#{1.week.to_i}; includeSubDomains"

  # Prevent clickjacking
  config.x_frame_options = "DENY"

  # Prevent MIME type sniffing
  config.x_content_type_options = "nosniff"

  # XSS protection (though largely redundant with CSP)
  config.x_xss_protection = "1; mode=block"

  # Prevent file downloads from opening automatically
  config.x_download_options = "noopen"

  # Restrict Adobe Flash Player's access to data
  config.x_permitted_cross_domain_policies = "none"

  # Referrer Policy - balance privacy and functionality
  config.referrer_policy = %w[strict-origin-when-cross-origin]

  # Content Security Policy (CSP)
  # This is a restrictive CSP that should be adjusted based on your app's needs
  config.csp = {
    # Meta values
    preserve_schemes: true,
    disable_nonce_backwards_compatibility: true,

    # Directive values
    default_src: %w['self' https:],
    base_uri: %w['self'],
    child_src: %w['self'],
    connect_src: %w['self' https: wss:],
    font_src: %w['self' https: data:],
    form_action: %w['self'],
    frame_ancestors: %w['none'],
    img_src: %w['self' https: data: blob:],
    manifest_src: %w['self'],
    media_src: %w['self' https:],
    object_src: %w['none'],
    script_src: %w['self' https: 'unsafe-inline'],
    style_src: %w['self' https: 'unsafe-inline'],
    worker_src: %w['self'],
    upgrade_insecure_requests: true

    # Report URI for CSP violations (optional)
    # report_uri: %w(https://your-report-uri-endpoint.com/csp)
  }

  # CSP Report Only - for testing new policies
  # Uncomment and modify when testing CSP changes
  # config.csp_report_only = config.csp.merge({
  #   report_uri: %w(https://your-report-uri-endpoint.com/csp-report-only)
  # })
end

# API-specific configuration (less restrictive for API endpoints)
SecureHeaders::Configuration.override(:api) do |config|
  # Keep essential security headers but relax CSP for API responses
  config.csp = {
    default_src: %w['none'],
    preserve_schemes: true
  }

  # Keep HSTS for API security
  config.hsts = "max-age=#{1.week.to_i}; includeSubDomains"

  # Essential headers for APIs
  config.x_content_type_options = "nosniff"
  config.x_xss_protection = "1; mode=block"

  # Opt out of less relevant headers for APIs
  config.x_frame_options = SecureHeaders::OPT_OUT
  config.x_download_options = SecureHeaders::OPT_OUT
  config.x_permitted_cross_domain_policies = SecureHeaders::OPT_OUT
end
