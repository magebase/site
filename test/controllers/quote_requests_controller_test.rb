require "test_helper"

class QuoteRequestsControllerTest < ActionDispatch::IntegrationTest
  test "should create quote request with new fields" do
    # Create test features
    google_play_store_ios = Feature.create!(name: "google_play_store_ios", description: "App store release", category: "deployment", base_cost: 5000.00, complexity_level: 4)
    pwa = Feature.create!(name: "pwa", description: "Progressive Web App", category: "frontend", base_cost: 1500.00, complexity_level: 2)

    assert_difference("QuoteRequest.count") do
      post quote_requests_url, params: {
        quote_request: {
          companyName: "Test Project",
          specialRequirements: "A test project description that is long enough to pass validation",
          useCase: "web_app",
          inspiration: "I want a modern, clean design similar to Stripe's dashboard",
          selectedLanguages: [ "English", "Spanish", "French" ],
          selectedSocialProviders: [ "Google", "Facebook" ],
          selectedFeatures: [ google_play_store_ios.name, pwa.name ],
          name: "Test Client",
          email: "test@example.com",
          phone: "+1234567890"
        }
      }
    end

    assert_response :success

    # Verify the quote request was created with new fields
    quote_request = QuoteRequest.last
    assert_equal "I want a modern, clean design similar to Stripe's dashboard", quote_request.inspiration
    assert_equal [ "English", "Spanish", "French" ], quote_request.selected_languages_data
    assert_equal [ "Google", "Facebook" ], quote_request.selected_social_providers_data
    assert_equal 2, quote_request.selected_features.count
  end
end
