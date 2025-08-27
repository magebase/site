require "test_helper"

class Api::QuotesControllerTest < ActionDispatch::IntegrationTest
  test "should calculate timeline using RubyLLM when timeline param is not provided" do
    # This test verifies that timeline is calculated without timeline parameter
    features = ["user_authentication", "payment_processing", "admin_dashboard", "analytics_tracking"]
    use_case = "E-commerce Platform"
    priority = "medium"

    post api_quotes_estimate_url, params: {
      use_case: use_case,
      selected_features: features,
      priority: priority,
      pricing_model: "flat_fee"
      # Note: NOT sending timeline parameter
    }, as: :json

    assert_response :success
    response_body = JSON.parse(response.body)

    # The response should include a timeline calculated by RubyLLM
    assert response_body["success"]
    assert response_body["estimate"]["estimated_time_to_mvp"].present?
    assert response_body["estimate"]["time_to_mvp_marketing"].present?

    # The timeline should be a number of months
    assert response_body["estimate"]["estimated_time_to_mvp"].is_a?(Integer)
    assert response_body["estimate"]["estimated_time_to_mvp"] > 0
  end
end
