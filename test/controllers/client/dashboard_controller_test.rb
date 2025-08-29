require "test_helper"

class Client::DashboardControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    # Create and sign in a user
    user = User.create!(email: "test@example.com", password: "password", name: "Test User")
    sign_in user

    get client_dashboard_url
    assert_response :success
  end
end
