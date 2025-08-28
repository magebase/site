require "test_helper"

class BlogContentGeneratorServiceTest < ActiveSupport::TestCase
  setup do
    @service = BlogContentGeneratorService.new
    @use_case = "e-commerce"
  end

  test "#generate_post generates blog post content for a use case" do
    # This test should verify the service can generate content for a use case
    use_case_data = { slug: 'e-commerce', title: 'E-commerce Solutions' }
    content = @service.generate_post('e-commerce', use_case_data)

    assert_not_nil content
    assert_not_empty content
    assert content.key?(:title)
    assert content.key?(:excerpt)
    assert content.key?(:content)
  end

  test "#generate_post handles invalid use case gracefully" do
    # Test error handling for invalid use cases
    use_case_data = { slug: 'invalid-case', title: 'Invalid Case' }
    content = @service.generate_post('invalid-case', use_case_data)

    assert_not_nil content
    assert content.key?(:title)
    assert content.key?(:excerpt)
    assert content.key?(:content)
  end

  test "#api_keys_configured? returns false when no keys are set" do
    # Test that the service correctly detects missing API keys
    original_openai = ENV["OPENAI_API_KEY"]
    original_anthropic = ENV["ANTHROPIC_API_KEY"]

    ENV["OPENAI_API_KEY"] = nil
    ENV["ANTHROPIC_API_KEY"] = nil

    # Create a new service instance to pick up the environment change
    service_without_keys = BlogContentGeneratorService.new

    refute service_without_keys.send(:api_keys_configured?)
  ensure
    ENV["OPENAI_API_KEY"] = original_openai
    ENV["ANTHROPIC_API_KEY"] = original_anthropic
  end
end
