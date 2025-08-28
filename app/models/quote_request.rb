class QuoteRequest < ApplicationRecord
  include AASM

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
end
