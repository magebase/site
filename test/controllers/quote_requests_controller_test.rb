require "test_helper"

class QuoteRequestsControllerTest < ActionDispatch::IntegrationTest
  # Skip fixtures for this test to avoid Ahoy issues
  self.use_transactional_tests = true

  test "should create quote request with new fields" do
    # Create test features
    google_play_store_ios = Feature.create!(name: 'google_play_store_ios', description: 'App store release', category: 'deployment', base_cost: 5000.00, complexity_level: 4)
    pwa = Feature.create!(name: 'pwa', description: 'Progressive Web App', category: 'frontend', base_cost: 1500.00, complexity_level: 2)

    assert_difference('QuoteRequest.count') do
      post quote_requests_url, params: {
        quote_request: {
          project_name: "Test Project",
          project_description: "A test project description that is long enough to pass validation",
          use_case: "web_app",
          inspiration: "I want a modern, clean design similar to Stripe's dashboard",
          selected_languages: ["English", "Spanish", "French"],
          selected_social_providers: ["Google", "Facebook"],
          feature_ids: [google_play_store_ios.id, pwa.id]
        }
      }, as: :json
    end

    assert_response :created
    json_response = JSON.parse(response.body)
    assert json_response['success']

    # Verify the quote request was created with new fields
    quote_request = QuoteRequest.last
    assert_equal "I want a modern, clean design similar to Stripe's dashboard", quote_request.inspiration
    assert_equal ["English", "Spanish", "French"], quote_request.selected_languages_data
    assert_equal ["Google", "Facebook"], quote_request.selected_social_providers_data
    assert_equal 2, quote_request.selected_features.count
  end
end
