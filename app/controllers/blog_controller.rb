class BlogController < ApplicationController
  def index
    @blog_posts = BlogPost.published.recent.page(params[:page]).per(12)
    @categories = BlogPost.published.distinct.pluck(:use_case_slug).compact.uniq

    render inertia: 'BlogIndex', props: {
      blogPosts: @blog_posts.as_json(only: [:id, :title, :excerpt, :slug, :published_at, :author_name, :author_title, :author_profile_picture, :use_case_slug]),
      categories: @categories,
      pagination: {
        current_page: @blog_posts.current_page,
        total_pages: @blog_posts.total_pages,
        total_count: @blog_posts.total_count
      }
    }
  end

  def show
    @blog_post = BlogPost.published.find_by!(slug: params[:slug])

    render inertia: 'BlogShow', props: {
      blogPost: @blog_post.as_json(only: [:id, :title, :content, :slug, :published_at, :author_name, :author_title, :author_profile_picture, :use_case_slug]),
      relatedPosts: @blog_post.related_posts(4).as_json(only: [:id, :title, :excerpt, :slug, :published_at, :author_name]),
      useCasePosts: @blog_post.use_case_posts(4).as_json(only: [:id, :title, :excerpt, :slug, :published_at, :author_name])
    }
  end

  def use_case
    @use_case_slug = params[:use_case_slug]
    @blog_posts = BlogPost.published.by_use_case(@use_case_slug).recent.page(params[:page]).per(12)

    # Get use case info from the data (you might want to create a UseCase model later)
    use_case_data = get_use_case_data(@use_case_slug)

    render inertia: 'BlogUseCase', props: {
      blogPosts: @blog_posts.as_json(only: [:id, :title, :excerpt, :slug, :published_at, :author_name, :author_title, :author_profile_picture, :use_case_slug]),
      useCase: use_case_data,
      useCaseSlug: @use_case_slug,
      pagination: {
        current_page: @blog_posts.current_page,
        total_pages: @blog_posts.total_pages,
        total_count: @blog_posts.total_count
      }
    }
  end

  def generate_post
    use_case_slug = params[:use_case_slug]
    use_case_data = get_use_case_data(use_case_slug)

    if use_case_data.nil?
      render json: { error: 'Use case not found' }, status: :not_found
      return
    end

    begin
      service = BlogContentGeneratorService.new
      content_data = service.generate_post(use_case_slug, use_case_data)

      blog_post = BlogPost.create!(
        title: content_data[:title],
        excerpt: content_data[:excerpt],
        content: content_data[:content],
        use_case_slug: use_case_slug,
        author_name: "AI Content Generator",
        author_title: "Technical Writer & Developer",
        published: true,
        tags: content_data[:tags] || []
      )

      render json: {
        success: true,
        blog_post: blog_post.as_json(only: [:id, :title, :slug, :published_at, :author_name])
      }
    rescue => e
      Rails.logger.error("Failed to generate blog post: #{e.message}")
      render json: { error: 'Failed to generate blog post' }, status: :internal_server_error
    end
  end

  private

  def get_use_case_data(slug)
    UseCaseDataService.find_by_slug(slug)
  end
end
