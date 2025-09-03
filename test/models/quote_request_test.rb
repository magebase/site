# == Schema Information
#
# Table name: quote_requests
#
#  id                        :bigint           not null, primary key
#  aasm_state                :string           default("draft")
#  admin_notes               :text
#  ai_pricing_json           :jsonb
#  approved_at               :datetime
#  delivery_address          :text
#  deposit_amount            :decimal(10, 2)
#  email                     :string
#  end_hire_date             :datetime
#  equipment_type            :string
#  estimated_cost            :decimal(10, 2)
#  inspiration               :text
#  monthly_retainer          :decimal(10, 2)
#  name                      :string
#  phone                     :string
#  project_description       :text
#  project_name              :string
#  project_plan_json         :jsonb
#  proposal_token            :string
#  quote_price               :decimal(, )
#  quoted_at                 :datetime
#  rental_duration           :string
#  selected_features_json    :jsonb
#  selected_languages        :jsonb
#  selected_social_providers :jsonb
#  special_requirements      :text
#  start_hire_date           :datetime
#  use_case                  :string
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  client_id                 :bigint
#  stripe_invoice_id         :string
#  tenant_id                 :bigint
#
# Indexes
#
#  index_quote_requests_on_aasm_state              (aasm_state)
#  index_quote_requests_on_client_id               (client_id)
#  index_quote_requests_on_proposal_token          (proposal_token) UNIQUE
#  index_quote_requests_on_selected_features_json  (selected_features_json) USING gin
#  index_quote_requests_on_tenant_id               (tenant_id)
#  index_quote_requests_on_use_case                (use_case)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (tenant_id => tenants.id)
#
require "test_helper"

class QuoteRequestTest < ActiveSupport::TestCase
  test "should handle new fields" do
    # Create a feature for the test
    feature = Feature.create!(name: "test_feature", description: "Test feature", category: "test", base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app",
      inspiration: "I want a modern design",
      selected_languages: [ "English", "Spanish" ],
      selected_social_providers: [ "Google", "Facebook" ]
    )

    # Associate the feature
    quote_request.selected_features << feature

    assert quote_request.save
    assert_equal "I want a modern design", quote_request.inspiration
    assert_equal [ "English", "Spanish" ], quote_request.selected_languages_data
    assert_equal [ "Google", "Facebook" ], quote_request.selected_social_providers_data
  end

  test "should handle empty new fields" do
    # Create a feature for the test
    feature = Feature.create!(name: "test_feature2", description: "Test feature 2", category: "test", base_cost: 100.00, complexity_level: 1)

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
    feature = Feature.create!(name: "test_feature", description: "Test feature", category: "test", base_cost: 100.00, complexity_level: 1)

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
    feature = Feature.create!(name: "test_feature", description: "Test feature", category: "test", base_cost: 100.00, complexity_level: 1)

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
