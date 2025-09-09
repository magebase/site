# == Schema Information
#
# Table name: tenants
#
#  id                 :bigint           not null, primary key
#  name               :string
#  stripe_customer_id :string
#  subdomain          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  user_id            :bigint           not null
#
# Indexes
#
#  index_tenants_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Tenant < ApplicationRecord
  belongs_to :user
  has_many :change_requests
  has_many :documents

  validates :name, presence: true
  validates :subdomain, presence: true, uniqueness: true
  validates :subdomain, format: { with: /\A[a-zA-Z0-9\-]+\z/, message: "only allows letters, numbers, and hyphens" }

  before_validation :normalize_subdomain

  private

  def normalize_subdomain
    self.subdomain = subdomain.downcase if subdomain.present?
  end
end
