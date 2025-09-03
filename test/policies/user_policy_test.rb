require "test_helper"

class UserPolicyTest < ActiveSupport::TestCase
  def test_scope
    user = User.create!(email: "test@example.com", password: "password")
    scope = UserPolicy::Scope.new(user, User.all)
    assert_raises NoMethodError do
      scope.resolve
    end
  end

  def test_show
    user = User.create!(email: "test@example.com", password: "password")
    policy = UserPolicy.new(user, user)
    assert_not policy.show?
  end

  def test_create
    user = User.create!(email: "test@example.com", password: "password")
    policy = UserPolicy.new(user, User.new)
    assert_not policy.create?
  end

  def test_update
    user = User.create!(email: "test@example.com", password: "password")
    policy = UserPolicy.new(user, user)
    assert_not policy.update?
  end

  def test_destroy
    user = User.create!(email: "test@example.com", password: "password")
    policy = UserPolicy.new(user, user)
    assert_not policy.destroy?
  end
end
