class TeamMember < ApplicationRecord
  validates :name, :position, :bio, presence: true
  validates :email, uniqueness: true, allow_blank: true

  scope :active, -> { where(active: true) }
  scope :ordered, -> { order(position: :asc) }
end
