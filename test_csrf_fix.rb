require 'rails_helper'

RSpec.describe QuoteRequestsController, type: :controller do
  describe "POST #create" do
    let(:valid_params) do
      {
        quote_request: {
          name: "Test User",
          email: "test@example.com",
          companyName: "Test Company",
          useCase: "web_app",
          specialRequirements: "This is a test quote request with more than 25 words to ensure validation passes properly and the form submission works correctly without any CSRF token issues.",
          estimatedCost: 5000
        }
      }
    end

    it "allows unauthenticated access to create action" do
      # This test verifies that the skip_before_action works
      expect(controller).to receive(:authenticate_user!).never
      expect(controller).to receive(:verify_authenticity_token).never

      post :create, params: valid_params, format: :json
    end
  end
end

puts "CSRF fix test created successfully"
