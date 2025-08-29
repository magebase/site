require "test_helper"

class TenantsControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    # Create a user first
    user = User.create!(email: "test@example.com", password: "password", name: "Test User")

    # Create a test tenant associated with the user
    tenant = Tenant.create!(name: "Test Tenant", subdomain: "test", user: user)

    # Sign in the user
    sign_in user

    # Test with subdomain
    host! "#{tenant.subdomain}.example.com"
    get tenant_dashboard_url
    assert_response :success
  end
end
