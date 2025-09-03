class BlogContentGeneratorService
  def initialize
    @chat = RubyLLM.chat if api_keys_configured?
  end

  def generate_post(use_case_slug, use_case_data)
    return fallback_post(use_case_slug, use_case_data) unless api_keys_configured?

    prompt = build_content_prompt(use_case_slug, use_case_data)

    response = @chat.ask(prompt)

    parse_generated_content(response.content)
  end

  def generate_daily_posts
    use_cases = get_all_use_cases

    use_cases.each do |use_case|
      next if already_has_post_today?(use_case[:slug])

      begin
        content = generate_post(use_case[:slug], use_case)
        create_blog_post(content, use_case[:slug])
        Rails.logger.info "Generated blog post for use case: #{use_case[:slug]}"
      rescue => e
        Rails.logger.error "Failed to generate blog post for #{use_case[:slug]}: #{e.message}"
      end
    end
  end

  private

  def api_keys_configured?
    ENV["OPENAI_API_KEY"].present? || ENV["ANTHROPIC_API_KEY"].present?
  end

  def fallback_post(use_case_slug, use_case_data)
    title = "Guide to #{use_case_data[:title]} Development"
    content = <<~CONTENT
# Introduction

Developing #{use_case_data[:title]} applications requires careful planning and the right technology stack.

# Best Practices

Always consider scalability, security, and user experience when building #{use_case_data[:title]} solutions.

# Technology Stack

Choose technologies that best fit your #{use_case_data[:title]} requirements and team expertise.
    CONTENT

    {
      title: title,
      excerpt: "Learn about developing #{use_case_data[:title]} applications with modern technologies and best practices.",
      content: content,
      tags: [ "software development", use_case_slug.parameterize ]
    }
  end

  def build_content_prompt(use_case_slug, use_case_data)
    <<~PROMPT
    You are an expert software development consultant writing authoritative content about developing #{use_case_data[:title]} applications.

    Write a comprehensive blog post (800-1200 words) about developing #{use_case_data[:title]} software solutions.

    Structure the post with:
    1. Compelling introduction about the importance of #{use_case_data[:title]} in modern business
    2. Technical challenges and solutions specific to #{use_case_data[:title]} development
    3. Best practices for #{use_case_data[:title]} application architecture
    4. Key features and functionalities that make #{use_case_data[:title]} solutions successful
    5. Technology stack recommendations
    6. Implementation timeline and cost considerations
    7. Success metrics and KPIs for #{use_case_data[:title]} applications
    8. Future trends and innovations in #{use_case_data[:title]} development

    Use professional, authoritative tone. Include specific technical details, code examples where relevant, and actionable insights.

    Make this post valuable for:
    - Business owners considering #{use_case_data[:title]} solutions
    - Developers building #{use_case_data[:title]} applications
    - CTOs evaluating #{use_case_data[:title]} technology investments

    Title: Make it SEO-optimized and compelling
    Excerpt: 150-200 word summary
    Content: Full article with proper headings and structure
    Tags: Relevant technical and business tags
    PROMPT
  end

  def parse_generated_content(content)
    # Parse the generated content and extract title, excerpt, and body
    lines = content.split("\n")
    title = extract_title(lines)
    excerpt = extract_excerpt(lines)
    body = extract_body(lines)

    {
      title: title,
      excerpt: excerpt,
      content: body,
      tags: generate_tags(title, body)
    }
  end

  def extract_title(lines)
    # Find the title (usually the first line or clearly marked)
    title_line = lines.find { |line| line.start_with?("Title:") || line.match?(/^\#{1,6}\s/) } || lines.first
    title_line&.gsub(/^Title:\s*/, "")&.strip || "Guide to Development"
  end

  def extract_excerpt(lines)
    # Extract or generate excerpt from content
    content_start = lines.find_index { |line| line.match?(/^\#{1,6}\s/) && !line.start_with?("Title:") }
    return lines[1..10].join(" ").strip if content_start.nil?

    excerpt_lines = lines[content_start..content_start+5]
    excerpt_lines.join(" ").strip
  end

  def extract_body(lines)
    # Extract the main content
    content_start = lines.find_index { |line| line.match?(/^\#{1,6}\s/) && !line.start_with?("Title:") }
    return lines.join("\n") if content_start.nil?

    lines[content_start..-1].join("\n")
  end

  def generate_tags(title, content)
    # Generate relevant tags based on content
    base_tags = [ "software development", "web applications", "technology" ]
    content_tags = []

    # Add use case specific tags
    content_tags << use_case_slug.parameterize

    # Add technology-related tags based on content analysis
    content_tags << "ruby on rails" if content.include?("Rails") || content.include?("Ruby")
    content_tags << "react" if content.include?("React")
    content_tags << "postgresql" if content.include?("PostgreSQL")
    content_tags << "api" if content.include?("API")

    (base_tags + content_tags).uniq
  end

  def create_blog_post(content_data, use_case_slug)
    BlogPost.create!(
      title: content_data[:title],
      excerpt: content_data[:excerpt],
      content: content_data[:content],
      use_case_slug: use_case_slug,
      author_name: "AI Content Generator",
      author_title: "Technical Writer & Developer",
      published: true,
      tags: content_data[:tags]
    )
  end

  def get_all_use_cases
    # This should return all use cases - for now using a simple array
    # Later this could come from a UseCase model or the useCaseData
    [
      { slug: "e-commerce", title: "E-commerce Solutions" },
      { slug: "food-delivery", title: "Food Delivery Platforms" },
      { slug: "healthcare-management-system", title: "Healthcare Management Systems" },
      { slug: "financial-services-banking", title: "Financial Services & Banking" }
      # Add more use cases as they are defined
    ]
  end

  def already_has_post_today?(use_case_slug)
    today = Date.current
    BlogPost.where(use_case_slug: use_case_slug)
             .where("DATE(published_at) = ?", today)
             .exists?
  end
end
