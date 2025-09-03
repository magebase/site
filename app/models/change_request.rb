# == Schema Information
#
# Table name: change_requests
#
#  id          :bigint           not null, primary key
#  description :text
#  priority    :string
#  status      :string
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  tenant_id   :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_change_requests_on_tenant_id  (tenant_id)
#  index_change_requests_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#  fk_rails_...  (user_id => users.id)
#
class ChangeRequest < ApplicationRecord
  belongs_to :tenant
  belongs_to :user

  validates :title, presence: true
  validates :description, presence: true

  # TODO: Fix enum conflict with RailsAdmin
  # enum status: { pending: 0, in_progress: 1, completed: 2, cancelled: 3 }
  # enum priority: { low: 0, medium: 1, high: 2, urgent: 3 }
end
