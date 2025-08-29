class UseCasesController < ApplicationController
  def index
    render inertia: "UseCasesIndex", props: {}
  end

  def show
    slug = params[:slug]

    # For now, we'll pass the slug to the frontend and let it handle the data
    # Later we can move this to a database-backed system
    render inertia: "UseCasePage", props: {
      slug: slug
    }
  end
end
