# frozen_string_literal: true

# Example controller demonstrating security headers usage
# This is a reference implementation - you can include SecurityHeadersConcern
# in any controller that needs custom security header configurations

class ExampleController < ApplicationController
  # Include the security headers concern
  include SecurityHeadersConcern

  # Example actions with different security policies

  # Default security headers (inherited from concern)
  def index
    # Uses default security headers
  end

  # API endpoint with relaxed security headers
  def api_data
    use_api_headers
    render json: { data: "API response" }
  end

  # File download with adjusted headers
  def download_file
    use_download_headers
    # File download logic here
  end

  # Admin page with stricter headers
  def admin_dashboard
    use_admin_headers
    # Admin dashboard logic here
  end

  # Page that needs to be framed (use with caution)
  def embedded_page
    allow_framing_from([ "https://trusted-domain.com" ])
  end

  # Page with external scripts (CDN, analytics, etc.)
  def page_with_external_scripts
    allow_external_scripts([ "https://cdn.example.com", "https://analytics.example.com" ])
    allow_external_styles([ "https://fonts.googleapis.com" ])
    allow_external_images([ "https://images.example.com" ])
  end

  # Emergency override (use only when absolutely necessary)
  def legacy_page
    # WARNING: This disables CSP - only use for legacy pages that cannot comply
    disable_csp
  end
end
