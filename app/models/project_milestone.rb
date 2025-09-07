# == Schema Information
#
# Table name: project_milestones
#
#  id               :bigint           not null, primary key
#  description      :text
#  due_date         :date
#  milestone_data   :jsonb
#  name             :string
#  status           :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  quote_request_id :bigint           not null
#
# Indexes
#
#  index_project_milestones_on_quote_request_id  (quote_request_id)
#
# Foreign Keys
#
#  fk_rails_...  (quote_request_id => quote_requests.id)
#
class ProjectMilestone < ApplicationRecord
  belongs_to :quote_request

  # Validations
  validates :name, presence: true
  validates :description, presence: true
  validates :status, presence: true, inclusion: { in: %w[pending in_progress completed overdue cancelled] }
  validates :due_date, presence: true

  # Scopes
  scope :pending, -> { where(status: "pending") }
  scope :in_progress, -> { where(status: "in_progress") }
  scope :completed, -> { where(status: "completed") }
  scope :overdue, -> { where(status: "overdue").or(where("due_date < ? AND status NOT IN (?)", Date.current, [ "completed", "cancelled" ])) }
  scope :upcoming, -> { where("due_date >= ? AND due_date <= ?", Date.current, 7.days.from_now) }

  # Callbacks
  before_save :update_overdue_status, if: :due_date_changed?

  def overdue?
    due_date < Date.current && !completed? && !cancelled?
  end

  def completed?
    status == "completed"
  end

  def cancelled?
    status == "cancelled"
  end

  def days_until_due
    (due_date - Date.current).to_i
  end

  def days_overdue
    return 0 unless overdue?
    (Date.current - due_date).to_i
  end

  private

  def update_overdue_status
    if overdue? && status != "overdue"
      self.status = "overdue"
    end
  end
end
