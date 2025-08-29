require "test_helper"

class BlogGenerationJobTest < ActiveJob::TestCase
  setup do
    @use_case_data = {
      slug: "e-commerce",
      title: "E-commerce Solutions",
      subtitle: "Build the next generation of online stores",
      description: "Comprehensive e-commerce development services",
      features: ["Shopping Cart", "Payment Integration"],
      category: "Commerce",
      complexity: "High",
      estimated_timeline: "8-16 weeks",
      target_audience: "Retailers, manufacturers",
      key_benefits: ["Increased sales revenue", "Global market reach"],
      technical_requirements: ["Product catalog", "Payment processor setup"],
      success_metrics: ["Conversion rate improvement", "Average order value increase"]
    }
  end

  test "generates daily blog posts for all use cases" do
    # Clean up any existing posts first
    BlogPost.delete_all

    # Perform the job - it will use fallback content since no API keys are configured
    BlogGenerationJob.perform_now

    # Verify that new blog posts were created (we have 35 use cases in our service)
    final_count = BlogPost.count
    assert_equal 35, final_count, "Expected exactly 35 blog posts to be created"

    # Verify the created posts have correct attributes
    created_posts = BlogPost.all
    assert_equal 35, created_posts.count

    created_posts.each do |post|
      assert post.published
      assert_not_nil post.published_at
      assert_equal "AI Content Generator", post.author_name
      assert_not_nil post.use_case_slug
      # Verify that the use case slug exists in our service
      use_case_data = UseCaseDataService.find_by_slug(post.use_case_slug)
      assert_not_nil use_case_data, "Use case #{post.use_case_slug} should exist in UseCaseDataService"
    end
  end

  test "skips generation if post already exists for use case today" do
    # Create a blog post for today
    BlogPost.create!(
      title: "Existing Post",
      content: "Existing content",
      excerpt: "Existing excerpt",
      use_case_slug: "e-commerce",
      author_name: "AI Content Generator",
      author_title: "Technical Writer & Developer",
      published: true,
      published_at: Time.current
    )

    initial_count = BlogPost.count

    # Perform the job - should not create new posts for e-commerce
    BlogGenerationJob.perform_now

    # Verify no new posts were created for e-commerce, but other use cases should still get posts
    final_count = BlogPost.count
    # We expect 34 new posts (all use cases except e-commerce)
    assert_equal initial_count + 34, final_count
  end

  test "handles service errors gracefully" do
    # Create a scenario that might cause an error (this is harder to test directly)
    # For now, just verify the job doesn't crash
    assert_nothing_raised do
      BlogGenerationJob.perform_now
    end

    # Verify that some posts were still created despite any potential errors
    created_posts = BlogPost.where("created_at >= ?", 1.minute.ago)
    assert_not_empty created_posts
  end

  test "is scheduled to run daily in recurring configuration" do
    # Read the recurring.yml configuration
    recurring_config_path = Rails.root.join("config", "recurring.yml")
    config = YAML.load_file(recurring_config_path)

    # Verify that blog_generation job is configured
    assert config["production"].key?("blog_generation"), "blog_generation job should be configured in recurring.yml"

    job_config = config["production"]["blog_generation"]

    # Verify the job is configured correctly
    assert_equal "BlogGenerationJob", job_config["class"]
    assert_equal "default", job_config["queue"]
    assert_equal "every day at 9am", job_config["schedule"]
  end
end
