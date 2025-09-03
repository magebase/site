require "test_helper"

class BlogControllerTest < ActionDispatch::IntegrationTest
  setup do
    @use_case_data = {
      slug: "e-commerce",
      title: "E-commerce Solutions",
      subtitle: "Build the next generation of online stores",
      description: "Comprehensive e-commerce development services",
      features: [ "Shopping Cart", "Payment Integration" ],
      category: "Commerce",
      complexity: "High",
      estimated_timeline: "8-16 weeks",
      target_audience: "Retailers, manufacturers",
      key_benefits: [ "Increased sales revenue", "Global market reach" ],
      technical_requirements: [ "Product catalog", "Payment processor setup" ],
      success_metrics: [ "Conversion rate improvement", "Average order value increase" ]
    }
  end

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
      author_profile_picture: "https://example.com/image.jpg",
      use_case_slug: "test-case",
      published_at: Time.current
    )
    get blog_post_url(blog_post.slug)
    assert_response :success
  end

  test "#generate_post creates a blog post for a valid use case" do
    # Test the endpoint - it should create a blog post and return success
    initial_count = BlogPost.count

    post generate_blog_post_path(use_case_slug: "e-commerce")

    assert_response :success
    response_body = JSON.parse(response.body)

    assert response_body["success"]
    assert_not_nil response_body["blog_post"]
    assert_equal "Guide to E-commerce Solutions Development", response_body["blog_post"]["title"]

    # Verify the blog post was actually created
    assert_equal initial_count + 1, BlogPost.count
    blog_post = BlogPost.last
    assert_equal "Guide to E-commerce Solutions Development", blog_post.title
    assert_equal "e-commerce", blog_post.use_case_slug
  end

  test "#generate_post returns error for invalid use case" do
    post generate_blog_post_path(use_case_slug: "invalid-use-case")

    assert_response :not_found
    response_body = JSON.parse(response.body)

    assert_not_nil response_body["error"]
    assert_equal "Use case not found", response_body["error"]
  end

  test "#generate_post handles service errors gracefully" do
    # Test with an invalid use case that will cause an error
    post generate_blog_post_path(use_case_slug: "nonexistent-case")

    assert_response :not_found
    response_body = JSON.parse(response.body)

    assert_not_nil response_body["error"]
  end
end
