require "test_helper"

class ResourcesControllerTest < ActionDispatch::IntegrationTest
  test "community action retrieves seeded page without creating new one" do
    # Ensure the page exists in DB (seeded)
    page = Page.find_by(slug: "community")
    assert_not_nil page, "Community page should be seeded in the database"

    # Count pages before
    initial_count = Page.count

    # Call the action
    get "/community"

    # Assert no new page was created
    assert_equal initial_count, Page.count, "No new page should be created"

    # Assert the response is successful
    assert_response :success

    # Assert the page data is passed (you can check the inertia props if needed)
    # For now, just check that it renders
  end

  test "documentation route returns 404" do
    get "/documentation"
    assert_response :not_found
  end

  test "templates route returns 404" do
    get "/templates"
    assert_response :not_found
  end

  test "template detail route returns 404" do
    get "/templates/some-slug"
    assert_response :not_found
  end
end
