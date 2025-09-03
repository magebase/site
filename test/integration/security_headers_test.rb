# frozen_string_literal: true

require "test_helper"

class SecurityHeadersTest < ActionDispatch::IntegrationTest
  test "security headers are present in responses" do
    get "/"

    # Check for essential security headers
    assert_response :success

    # X-Frame-Options
    assert_equal "DENY", response.headers["X-Frame-Options"]

    # X-Content-Type-Options
    assert_equal "nosniff", response.headers["X-Content-Type-Options"]

    # X-XSS-Protection
    assert_includes response.headers["X-XSS-Protection"], "1; mode=block"

    # X-Download-Options
    assert_equal "noopen", response.headers["X-Download-Options"]

    # X-Permitted-Cross-Domain-Policies
    assert_equal "none", response.headers["X-Permitted-Cross-Domain-Policies"]

    # Referrer-Policy
    assert_not_nil response.headers["Referrer-Policy"]

    # Content Security Policy
    assert_not_nil response.headers["Content-Security-Policy"]
    assert_includes response.headers["Content-Security-Policy"], "default-src"

    # HTTP Strict Transport Security - only in production with HTTPS
    if Rails.env.production?
      assert_not_nil response.headers["Strict-Transport-Security"]
      assert_includes response.headers["Strict-Transport-Security"], "max-age"
    end
  end

  test "API responses have appropriate security headers" do
    # This test checks API responses for basic security headers
    # Note: API controllers would need to include SecurityHeadersConcern and use :api override for full API-specific behavior
    get "/api/features"

    # API responses should still have essential security headers
    assert_equal "nosniff", response.headers["X-Content-Type-Options"]
    assert_includes response.headers["X-XSS-Protection"], "1; mode=block"

    # For now, API responses use default headers (including X-Frame-Options)
    # To use API-specific overrides, controllers need to include SecurityHeadersConcern
    assert_equal "DENY", response.headers["X-Frame-Options"]
  end

  test "cookies have secure attributes" do
    # This test will pass if your application sets any cookies
    get "/"

    # Check that any cookies set have secure attributes
    cookies = response.headers["Set-Cookie"]
    if cookies
      Array(cookies).each do |cookie|
        # In development, cookies might not be marked as Secure (no HTTPS)
        # but they should still have HttpOnly and SameSite attributes
        assert_includes cookie, "HttpOnly", "Cookie should have HttpOnly flag"
        assert_includes cookie.downcase, "samesite", "Cookie should have SameSite attribute"

        # Only check for Secure flag in production (not in test environment)
        if Rails.env.production?
          assert_includes cookie, "Secure", "Cookie should have Secure flag in production"
        end
      end
    end
  end
end
