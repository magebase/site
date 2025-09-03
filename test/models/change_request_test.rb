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
require "test_helper"

class ChangeRequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
