# == Schema Information
#
# Table name: documents
#
#  id         :bigint           not null, primary key
#  file_path  :string
#  file_type  :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tenant_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_documents_on_tenant_id  (tenant_id)
#  index_documents_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#  fk_rails_...  (user_id => users.id)
#
require "test_helper"

class DocumentTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    document = Document.new(
      name: "Test Document",
      file_path: "/path/to/test.pdf",
      file_type: "application/pdf",
      tenant: tenants(:one),
      user: users(:one)
    )
    assert document.valid?
  end

  test "should validate presence of name" do
    document = Document.new(
      file_path: "/path/to/test.pdf",
      file_type: "application/pdf",
      tenant: tenants(:one),
      user: users(:one)
    )
    assert_not document.valid?
    assert_includes document.errors[:name], "can't be blank"
  end

  test "should validate presence of file_path" do
    document = Document.new(
      name: "Test Document",
      file_type: "application/pdf",
      tenant: tenants(:one),
      user: users(:one)
    )
    assert_not document.valid?
    assert_includes document.errors[:file_path], "can't be blank"
  end

  test "should validate presence of file_type" do
    document = Document.new(
      name: "Test Document",
      file_path: "/path/to/test.pdf",
      tenant: tenants(:one),
      user: users(:one)
    )
    assert_not document.valid?
    assert_includes document.errors[:file_type], "can't be blank"
  end

  test "should belong to tenant" do
    document = documents(:one)
    assert_instance_of Tenant, document.tenant
  end

  test "should belong to user" do
    document = documents(:one)
    assert_instance_of User, document.user
  end

  test "should be scoped to current tenant when multi-tenancy is active" do
    MultiTenant.current_tenant = tenants(:one)
    document = Document.new(
        name: "Test Document",
        file_path: "/path/to/test.pdf",
        file_type: "application/pdf",
        user: users(:one)
      )
      assert document.valid?
      assert_equal tenants(:one), document.tenant
  end
end
