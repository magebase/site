class BlogGenerationJob < ApplicationJob
  queue_as :default

  def perform
    use_cases = UseCaseDataService.all

    use_cases.each do |use_case|
      generate_post_for_use_case(use_case)
    end

    Rails.logger.info "Blog generation job completed for #{use_cases.count} use cases"
  end

  private

  def generate_post_for_use_case(use_case)
    use_case_slug = use_case[:slug]

    # Skip if we already have a post for this use case today
    if already_has_post_today?(use_case_slug)
      Rails.logger.info "Skipping #{use_case_slug} - already has post today"
      return
    end

    begin
      service = BlogContentGeneratorService.new
      content_data = service.generate_post(use_case_slug, use_case)

      blog_post = BlogPost.create!(
        title: content_data[:title],
        excerpt: content_data[:excerpt],
        content: content_data[:content],
        use_case_slug: use_case_slug,
        author_name: "AI Content Generator",
        author_title: "Technical Writer & Developer",
        published: true
      )

      Rails.logger.info "Generated blog post for use case: #{use_case_slug} - #{blog_post.title}"
    rescue => e
      Rails.logger.error "Failed to generate blog post for #{use_case_slug}: #{e.message}"
      # Continue with other use cases even if one fails
    end
  end

  def already_has_post_today?(use_case_slug)
    today = Date.current
    BlogPost.where(use_case_slug: use_case_slug)
             .where("DATE(published_at) = ?", today)
             .exists?
  end
end
