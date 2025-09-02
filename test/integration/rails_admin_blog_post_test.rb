require "test_helper"

class RailsAdminBlogPostTest < ActionDispatch::IntegrationTest
  setup do
    # Create a test blog post
    @blog_post = BlogPost.create!(
      title: "Test Blog Post",
      content: "This is test content for RailsAdmin integration",
      excerpt: "Test excerpt",
      use_case_slug: "e-commerce",
      author_name: "Test Author",
      author_title: "Test Title",
      published: true,
      published_at: Time.current
    )
  end

  test "BlogPost is configured in RailsAdmin" do
    # Verify that BlogPost model is registered with RailsAdmin
    rails_admin_models = RailsAdmin::Config.models.map(&:abstract_model).map(&:model)
    assert_includes rails_admin_models, BlogPost
  end

  test "BlogPost has correct fields configured in RailsAdmin" do
    blog_post_config = RailsAdmin::Config.model(BlogPost)

    # Verify essential fields are configured
    configured_fields = blog_post_config.fields.map(&:name).map(&:to_s)

    # Check that important fields are present
    assert_includes configured_fields, "title"
    assert_includes configured_fields, "content"
    assert_includes configured_fields, "excerpt"
    assert_includes configured_fields, "use_case_slug"
    assert_includes configured_fields, "author_name"
    assert_includes configured_fields, "author_title"
    assert_includes configured_fields, "published"
    assert_includes configured_fields, "published_at"
    assert_includes configured_fields, "featured"
  end

  test "BlogPost has appropriate list view configuration" do
    blog_post_config = RailsAdmin::Config.model(BlogPost)

    # Verify list view includes important columns
    list_fields = blog_post_config.list.fields.map(&:name).map(&:to_s)
    assert_includes list_fields, "title"
    assert_includes list_fields, "use_case_slug"
    assert_includes list_fields, "published"
    assert_includes list_fields, "published_at"
    assert_includes list_fields, "featured"
  end

  test "BlogPost has appropriate show view configuration" do
    blog_post_config = RailsAdmin::Config.model(BlogPost)

    # Verify show view includes important fields
    show_fields = blog_post_config.show.fields.map(&:name).map(&:to_s)
    assert_includes show_fields, "title"
    assert_includes show_fields, "content"
    assert_includes show_fields, "excerpt"
    assert_includes show_fields, "use_case_slug"
    assert_includes show_fields, "author_name"
    assert_includes show_fields, "published"
    assert_includes show_fields, "published_at"
  end

  test "BlogPost has appropriate edit view configuration" do
    blog_post_config = RailsAdmin::Config.model(BlogPost)

    # Verify edit view includes editable fields
    edit_fields = blog_post_config.edit.fields.map(&:name).map(&:to_s)
    assert_includes edit_fields, "title"
    assert_includes edit_fields, "content"
    assert_includes edit_fields, "excerpt"
    assert_includes edit_fields, "use_case_slug"
    assert_includes edit_fields, "author_name"
    assert_includes edit_fields, "author_title"
    assert_includes edit_fields, "published"
    assert_includes edit_fields, "featured"
  end
end
