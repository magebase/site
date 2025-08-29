require "test_helper"

class ChangeRequestsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get change_requests_index_url
    assert_response :success
  end

  test "should get new" do
    get change_requests_new_url
    assert_response :success
  end

  test "should get create" do
    get change_requests_create_url
    assert_response :success
  end

  test "should get show" do
    get change_requests_show_url
    assert_response :success
  end

  test "should get update" do
    get change_requests_update_url
    assert_response :success
  end
end
