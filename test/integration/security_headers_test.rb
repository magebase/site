# frozen_string_literal: true

require "test_helper"

class SecurityHeadersTest < ActionDispatch::IntegrationTest
  test "security headers are present in responses" do
    get "/"

    # Check for essential security headers
    assert_response :success

    # HTTP Strict Transport Security
    assert_not_nil response.headers["Strict-Transport-Security"]
    assert_includes response.headers["Strict-Transport-Security"], "max-age"

    # Content Security Policy
    assert_not_nil response.headers["Content-Security-Policy"]
    assert_includes response.headers["Content-Security-Policy"], "default-src"

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
  end

  test "API responses have appropriate security headers" do
    # This test assumes you have an API controller that uses the :api override
    # Adjust the path based on your actual API endpoints
    get "/api/v1/status" # Adjust this path to match your API

    # API responses should still have essential security headers
    assert_equal "nosniff", response.headers["X-Content-Type-Options"]
    assert_includes response.headers["X-XSS-Protection"], "1; mode=block"

    # But should not have headers that don't make sense for APIs
    # (These assertions will pass if the headers are absent or set to OPT_OUT)
    assert_nil response.headers["X-Frame-Options"] ||
               response.headers["X-Frame-Options"] == SecureHeaders::OPT_OUT
  end

  test "cookies have secure attributes" do
    # This test will pass if your application sets any cookies
    get "/"

    # Check that any cookies set have secure attributes
    cookies = response.headers["Set-Cookie"]
    if cookies
      Array(cookies).each do |cookie|
        assert_includes cookie, "Secure", "Cookie should have Secure flag"
        assert_includes cookie, "HttpOnly", "Cookie should have HttpOnly flag"
        assert_includes cookie, "SameSite", "Cookie should have SameSite attribute"
      end
    end
  end
end
