class BlogController < ApplicationController
  def index
    @blog_posts = BlogPost.published.order(published_at: :desc)
    render inertia: 'BlogIndex', props: {
      blogPosts: @blog_posts.as_json(only: [:id, :title, :excerpt, :slug, :published_at, :author_name, :author_title, :author_profile_picture])
    }
  end

  def show
    @blog_post = BlogPost.published.find_by!(slug: params[:slug])
    render inertia: 'BlogShow', props: {
      blogPost: @blog_post.as_json(only: [:id, :title, :content, :slug, :published_at, :author_name, :author_title, :author_profile_picture])
    }
  end
end
