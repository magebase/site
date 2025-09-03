class ServicesController < ApplicationController
  def index
    @services = Service.published.order(position: :asc)
    render inertia: "ServicesIndex", props: {
      services: @services.as_json(only: [ :id, :title, :slug, :description, :excerpt, :icon, :category ])
    }
  end

  def show
    @service = Service.published.find_by!(slug: params[:slug])
    render inertia: "ServicesShow", props: {
      service: @service.as_json(only: [ :id, :title, :slug, :description, :content, :excerpt, :meta_title, :meta_description, :icon, :category ])
    }
  end
end
