# == Schema Information
#
# Table name: tenants
#
#  id         :bigint           not null, primary key
#  name       :string
#  subdomain  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_tenants_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require "test_helper"

class TenantTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    tenant = Tenant.new(name: "Test Tenant", subdomain: "test-tenant", user: users(:one))
    assert tenant.valid?
  end

  test "should normalize subdomain to lowercase" do
    tenant = Tenant.new(name: "Test Tenant", subdomain: "Test-Tenant", user: users(:one))
    tenant.save
    assert_equal "test-tenant", tenant.subdomain
  end

  test "should validate presence of name" do
    tenant = Tenant.new(subdomain: "test-tenant", user: users(:one))
    assert_not tenant.valid?
    assert_includes tenant.errors[:name], "can't be blank"
  end

  test "should validate presence of subdomain" do
    tenant = Tenant.new(name: "Test Tenant", user: users(:one))
    assert_not tenant.valid?
    assert_includes tenant.errors[:subdomain], "can't be blank"
  end

  test "should validate uniqueness of subdomain" do
    Tenant.create!(name: "Existing Tenant", subdomain: "existing-tenant", user: users(:one))
    tenant = Tenant.new(name: "New Tenant", subdomain: "existing-tenant", user: users(:two))
    assert_not tenant.valid?
    assert_includes tenant.errors[:subdomain], "has already been taken"
  end

  test "should validate subdomain format" do
    tenant = Tenant.new(name: "Test Tenant", subdomain: "invalid subdomain!", user: users(:one))
    assert_not tenant.valid?
    assert_includes tenant.errors[:subdomain], "only allows letters, numbers, and hyphens"
  end

  test "should belong to user" do
    tenant = tenants(:one)
    user = tenant.user
    assert user.is_a?(User)
  end

  test "should have many change_requests" do
    tenant = tenants(:one)
    assert_respond_to tenant, :change_requests
  end

  test "should have many documents" do
    tenant = tenants(:one)
    assert_respond_to tenant, :documents
  end
end
