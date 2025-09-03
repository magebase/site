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
end
