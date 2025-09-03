class BlogsController < ApplicationController
  def index
    @blogs = Blog.published.recent.page(params[:page]).per(12)
    @categories = Blog.published.distinct.pluck(:category)

    render inertia: "BlogsIndex", props: {
      blogs: @blogs.as_json(include: [ :tags ]),
      categories: @categories,
      pagination: {
        current_page: @blogs.current_page,
        total_pages: @blogs.total_pages,
        total_count: @blogs.total_count
      }
    }
  end

  def show
    @blog = Blog.published.find_by!(slug: params[:slug])

    # Track view (you might want to implement this later)
    # @blog.increment!(:views_count)

    render inertia: "BlogShow", props: {
      blog: @blog.as_json(include: [ :tags ]),
      related_posts: @blog.related_posts(4).as_json(include: [ :tags ]),
      use_case_posts: @blog.use_case_posts(4).as_json(include: [ :tags ])
    }
  end

  def category
    @category = params[:category]
    @blogs = Blog.published.by_category(@category).recent.page(params[:page]).per(12)

    render inertia: "BlogsCategory", props: {
      blogs: @blogs.as_json(include: [ :tags ]),
      category: @category,
      pagination: {
        current_page: @blogs.current_page,
        total_pages: @blogs.total_pages,
        total_count: @blogs.total_count
      }
    }
  end

  def use_case
    @use_case_slug = params[:use_case_slug]
    @blogs = Blog.published.by_use_case(@use_case_slug).recent.page(params[:page]).per(12)

    # Get use case info from the data (you might want to create a UseCase model later)
    use_case_data = get_use_case_data(@use_case_slug)

    render inertia: "BlogsUseCase", props: {
      blogs: @blogs.as_json(include: [ :tags ]),
      use_case: use_case_data,
      use_case_slug: @use_case_slug,
      pagination: {
        current_page: @blogs.current_page,
        total_pages: @blogs.total_pages,
        total_count: @blogs.total_count
      }
    }
  end

  private

  def get_use_case_data(slug)
    # This is a temporary implementation
    # Later you might want to create a UseCase model
    use_case_data = {
      "e-commerce" => { title: "E-commerce", description: "Online retail solutions" },
      "food-delivery" => { title: "Food Delivery", description: "Restaurant delivery platforms" },
      "healthcare" => { title: "Healthcare", description: "Medical management systems" }
    }

    use_case_data[slug] || { title: slug.titleize, description: "Software development for #{slug.titleize}" }
  end
end
