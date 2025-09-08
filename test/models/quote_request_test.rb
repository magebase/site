# == Schema Information
#
# Table name: quote_requests
#
#  id                        :bigint           not null, primary key
#  aasm_state                :string           default("draft")
#  ai_pricing_json           :jsonb
#  deposit_amount            :decimal(10, 2)
#  email                     :string
#  estimated_cost            :decimal(10, 2)
#  inspiration               :text
#  monthly_retainer          :decimal(10, 2)
#  name                      :string
#  phone                     :string
#  project_description       :text
#  project_name              :string
#  project_plan_json         :jsonb
#  proposal_token            :string
#  quoted_at                 :datetime
#  selected_features_json    :jsonb
#  selected_languages        :jsonb
#  selected_social_providers :jsonb
#  slug                      :string
#  use_case                  :string
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  client_id                 :bigint
#  tenant_id                 :bigint
#
# Indexes
#
#  index_quote_requests_on_aasm_state              (aasm_state)
#  index_quote_requests_on_client_id               (client_id)
#  index_quote_requests_on_proposal_token          (proposal_token) UNIQUE
#  index_quote_requests_on_selected_features_json  (selected_features_json) USING gin
#  index_quote_requests_on_slug                    (slug)
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
    # Set up tenant context
    tenant = tenants(:one)
    MultiTenant.current_tenant = tenant

    # Create a feature for the test
    feature = Feature.create!(name: "test_feature", description: "Test feature", category: "test", base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app",
      inspiration: "I want a modern design",
      selected_languages: [ "English", "Spanish" ],
      selected_social_providers: [ "Google", "Facebook" ],
      tenant: tenant
    )

    # Associate the feature
    quote_request.selected_features << feature

    assert quote_request.save
    assert_equal "I want a modern design", quote_request.inspiration
    assert_equal [ "English", "Spanish" ], quote_request.selected_languages_data
    assert_equal [ "Google", "Facebook" ], quote_request.selected_social_providers_data
  end

  test "should handle empty new fields" do
    # Set up tenant context
    tenant = tenants(:one)
    MultiTenant.current_tenant = tenant

    # Create a feature for the test
    feature = Feature.create!(name: "test_feature2", description: "Test feature 2", category: "test", base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app",
      tenant: tenant
    )

    # Associate the feature
    quote_request.selected_features << feature

    success = quote_request.save
    puts "Save successful: #{success}"
    puts "Errors: #{quote_request.errors.full_messages}" if !success
    assert success
    assert_nil quote_request.inspiration
    assert_empty quote_request.selected_languages_data
    assert_empty quote_request.selected_social_providers_data
  end

  test "should have initial draft state" do
    # Set up tenant context
    tenant = tenants(:one)
    MultiTenant.current_tenant = tenant

    feature = Feature.create!(name: "test_feature", description: "Test feature", category: "test", base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app",
      tenant: tenant
    )
    quote_request.selected_features << feature

    assert quote_request.save
    assert_equal "draft", quote_request.aasm_state
    assert quote_request.draft?
  end

  test "should transition from draft to quoted" do
    # Set up tenant context
    tenant = tenants(:one)
    MultiTenant.current_tenant = tenant

    feature = Feature.create!(name: "test_feature", description: "Test feature", category: "test", base_cost: 100.00, complexity_level: 1)

    quote_request = QuoteRequest.new(
      project_name: "Test Project",
      project_description: "This is a test project description that is long enough",
      use_case: "web_app",
      tenant: tenant
    )
    quote_request.selected_features << feature
    quote_request.save!

    assert quote_request.draft?
    quote_request.generate_quote!
    assert quote_request.quoted?
  end
end
