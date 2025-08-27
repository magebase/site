require "test_helper"

class QuoteRequestsControllerTest < ActionDispatch::IntegrationTest
  test "should create quote request" do
    assert_difference('QuoteRequest.count') do
      post quote_requests_url, params: {
        quote_request: {
          name: "Test User",
          email: "test@example.com",
          phone: "0412345678",
          company: "Test Company",
          equipment_type: "Generator",
          rental_duration: "1 week",
          delivery_address: "123 Test Street, Brisbane QLD 4000",
          message: "Test message for quote request"
        }
      }, as: :json
    end
    assert_response :created
    json_response = JSON.parse(response.body)
    assert json_response['success']
    assert_equal 'Quote request submitted successfully!', json_response['message']
  end
end
