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
  test "should be valid with valid attributes" do
    change_request = ChangeRequest.new(
      title: "Test Change Request",
      description: "This is a test change request",
      tenant: tenants(:one),
      user: users(:one)
    )
    assert change_request.valid?
  end

  test "should validate presence of title" do
    change_request = ChangeRequest.new(
      description: "This is a test change request",
      tenant: tenants(:one),
      user: users(:one)
    )
    assert_not change_request.valid?
    assert_includes change_request.errors[:title], "can't be blank"
  end

  test "should validate presence of description" do
    change_request = ChangeRequest.new(
      title: "Test Change Request",
      tenant: tenants(:one),
      user: users(:one)
    )
    assert_not change_request.valid?
    assert_includes change_request.errors[:description], "can't be blank"
  end

  test "should belong to tenant" do
    change_request = change_requests(:one)
    assert_instance_of Tenant, change_request.tenant
  end

  test "should belong to user" do
    change_request = change_requests(:one)
    assert_instance_of User, change_request.user
  end

  test "should be scoped to current tenant when multi-tenancy is active" do
    MultiTenant.current_tenant = tenants(:one)
    change_request = ChangeRequest.new(
        title: "Test Change Request",
        description: "This is a test change request",
        user: users(:one)
      )
      assert change_request.valid?
      assert_equal tenants(:one), change_request.tenant
  end
end
