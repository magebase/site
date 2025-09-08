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
class QuoteRequest < ApplicationRecord
  include AASM
  extend FriendlyId
  multi_tenant :tenant

  # Friendly ID configuration for expiring permalinks
  friendly_id :generate_permalink_slug, use: :slugged

  belongs_to :client, optional: true
  belongs_to :tenant, optional: true
  has_many :quote_request_features, dependent: :destroy
  has_many :selected_features, through: :quote_request_features, source: :feature
  has_many :project_milestones, dependent: :destroy
  has_one :contract, dependent: :destroy
  has_many :payments, dependent: :destroy

  accepts_nested_attributes_for :selected_features

  # Validations
  validates :project_name, presence: true
  validates :project_description, presence: true, length: { minimum: 10 }
  validates :use_case, presence: true
  validates :selected_features, presence: true
  validates :proposal_token, uniqueness: true, allow_nil: true

  # Status tracking with AASM
  aasm do
    state :draft, initial: true
    state :quoted
    state :contracted
    state :deposit_paid
    state :in_development
    state :completed

    event :generate_quote do
      transitions from: :draft, to: :quoted
      after do
        # Calculate pricing and generate project plan when quote is generated
        PricingService.new(self).calculate_price
        ProjectPlanningService.new(self).generate_plan
        generate_proposal_token!
        update!(quoted_at: Time.current)
      end
    end

    event :accept_quote do
      transitions from: :quoted, to: :contracted
    end

    event :pay_deposit do
      transitions from: :contracted, to: :deposit_paid
    end

    event :start_development do
      transitions from: :deposit_paid, to: :in_development
    end

    event :complete do
      transitions from: :in_development, to: :completed
    end
  end

  # Scopes
  scope :active, -> { where.not(aasm_state: :completed) }
  scope :recent, -> { order(created_at: :desc) }

  # Methods
  def total_cost
    estimated_cost.to_f + monthly_retainer.to_f * 12
  end

  def deposit_percentage
    return 0 if estimated_cost.to_f.zero?
    (deposit_amount.to_f / estimated_cost.to_f * 100).round(2)
  end

  def selected_feature_names
    selected_features.pluck(:name)
  end

  def selected_features_data
    return [] unless selected_features_json.present?
    JSON.parse(selected_features_json) rescue []
  end

  def ai_pricing_data
    return {} unless ai_pricing_json.present?
    JSON.parse(ai_pricing_json) rescue {}
  end

  def selected_languages_data
    return [] unless selected_languages.present?
    selected_languages.is_a?(Array) ? selected_languages : JSON.parse(selected_languages) rescue []
  end

  def selected_social_providers_data
    return [] unless selected_social_providers.present?
    selected_social_providers.is_a?(Array) ? selected_social_providers : JSON.parse(selected_social_providers) rescue []
  end

  # Get use case data by converting display name to slug
  def use_case_data
    return nil unless use_case.present?
    UseCaseDataService.find_by_name_or_slug(use_case)
  end

  # Get use case slug from display name
  def use_case_slug
    return nil unless use_case.present?
    UseCaseDataService.display_name_to_slug(use_case)
  end

  # Generate a unique proposal token
  def generate_proposal_token!
    return proposal_token if proposal_token.present?

    loop do
      token = SecureRandom.urlsafe_base64(32)
      unless QuoteRequest.exists?(proposal_token: token)
        update!(proposal_token: token)
        break token
      end
    end
  end

  # Generate permalink slug for FriendlyId
  def generate_permalink_slug
    base_name = project_name.presence || "project"
    "#{base_name.parameterize}-#{SecureRandom.hex(4)}"
  end

  # Get public proposal URL with FriendlyId slug
  def public_proposal_url
    return nil unless slug.present?
    Rails.application.routes.url_helpers.public_proposal_url(slug: slug, host: ENV["APP_HOST"] || "localhost:3000")
  end

  # Check if permalink is expired (7 days)
  def permalink_expired?
    return false unless slug.present?
    created_at < 7.days.ago
  end
end
