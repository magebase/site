require "test_helper"

class TenantsControllerTest < ActionDispatch::IntegrationTest
  setup do
    Warden.test_mode!
  end

  teardown do
    Warden.test_reset!
  end

  test "should get dashboard" do
    # Create a user first
    user = User.create!(email: "test@example.com", password: "password", name: "Test User")

    # Create a test tenant associated with the user
    tenant = Tenant.create!(name: "Test Tenant", subdomain: "test", user: user)

    # Sign in the user
    login_as(user, scope: :user)

    # Test with path-based routing
    get "/#{tenant.subdomain}/tenant/dashboard"
    assert_response :success
  end
end
