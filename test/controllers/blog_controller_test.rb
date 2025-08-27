require "test_helper"

class BlogControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get blog_url
    assert_response :success
  end

  test "should get show" do
    blog_post = BlogPost.create!(
      title: "Test Post",
      content: "Test content",
      excerpt: "Test excerpt",
      published: true,
      author_name: "Test Author",
      author_title: "Test Title",
      author_profile_picture: "https://example.com/image.jpg"
    )
    get blog_post_url(blog_post.slug)
    assert_response :success
  end
end
