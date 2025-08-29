class ChangeRequest < ApplicationRecord
  belongs_to :tenant
  belongs_to :user

  validates :title, presence: true
  validates :description, presence: true

  enum status: { pending: 0, in_progress: 1, completed: 2, cancelled: 3 }
  enum priority: { low: 0, medium: 1, high: 2, urgent: 3 }
end
