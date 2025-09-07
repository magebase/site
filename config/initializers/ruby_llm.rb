RubyLLM.configure do |config|
  # Configure multiple LLM providers
  config.gemini_api_key = ENV["GOOGLE_STUDIO_API_KEY"]
  config.openai_api_key = ENV["OPENAI_API_KEY"]
  config.anthropic_api_key = ENV["ANTHROPIC_API_KEY"]

  # Set default provider based on environment variable
  default_provider = ENV["DEFAULT_LLM_PROVIDER"] || "google"

  case default_provider
  when "google"
    config.default_model = "gemini-2.5-flash"
  when "openai"
    config.default_model = "gpt-4"
  when "anthropic"
    config.default_model = "claude-3-sonnet-20240229"
  end
end
