class LegalController < ApplicationController
  skip_before_action :authenticate_user!

  def privacy_policy
    @page = Page.published.find_by(slug: "privacy-policy")
    render inertia: "LegalPrivacyPolicy", props: {
      page: @page&.as_json(only: [ :title, :content, :excerpt ])
    }
  end

  def terms_of_service
    @page = Page.published.find_by(slug: "terms-of-service")
    render inertia: "LegalTermsOfService", props: {
      page: @page&.as_json(only: [ :title, :content, :excerpt ])
    }
  end

  def cookie_policy
    @page = Page.published.find_by(slug: "cookie-policy")
    render inertia: "LegalCookiePolicy", props: {
      page: @page&.as_json(only: [ :title, :content, :excerpt ])
    }
  end

  def gdpr
    @page = Page.published.find_by(slug: "gdpr")
    render inertia: "LegalGdpr", props: {
      page: @page&.as_json(only: [ :title, :content, :excerpt ])
    }
  end

  def security
    @page = Page.published.find_by(slug: "security-information")
    render inertia: "LegalSecurity", props: {
      page: @page&.as_json(only: [ :title, :content, :excerpt ])
    }
  end
end
