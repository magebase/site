require "test_helper"

class QuoteRequestTest < ActiveSupport::TestCase
  test "should handle new fields" do
    # Create a feature for the test
    feature = Feature.create!(name: 'test_feature', description: 'Test feature', category: 'test', base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app",
      inspiration: "I want a modern design",
      selected_languages: ["English", "Spanish"],
      selected_social_providers: ["Google", "Facebook"]
    )

    # Associate the feature
    quote_request.selected_features << feature

    assert quote_request.save
    assert_equal "I want a modern design", quote_request.inspiration
    assert_equal ["English", "Spanish"], quote_request.selected_languages_data
    assert_equal ["Google", "Facebook"], quote_request.selected_social_providers_data
  end

  test "should handle empty new fields" do
    # Create a feature for the test
    feature = Feature.create!(name: 'test_feature2', description: 'Test feature 2', category: 'test', base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app"
    )

    # Associate the feature
    quote_request.selected_features << feature

    assert quote_request.save
    assert_nil quote_request.inspiration
    assert_empty quote_request.selected_languages_data
    assert_empty quote_request.selected_social_providers_data
  end

  test "should have initial draft state" do
    feature = Feature.create!(name: 'test_feature', description: 'Test feature', category: 'test', base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app"
    )
    quote_request.selected_features << feature

    assert quote_request.save
    assert_equal "draft", quote_request.aasm_state
    assert quote_request.draft?
  end

  test "should transition from draft to quoted" do
    feature = Feature.create!(name: 'test_feature', description: 'Test feature', category: 'test', base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app"
    )
    quote_request.selected_features << feature
    quote_request.save

    quote_request.generate_quote!

    assert_equal "quoted", quote_request.aasm_state
    assert quote_request.quoted?
  end
end
