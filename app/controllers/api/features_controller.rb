class Api::FeaturesController < ApplicationController
  # Override authentication for API controllers
  def authenticate_user!
    # API endpoints don't require authentication
  end

  def index
    @features = Feature.all.order(:category, :name)
    render json: @features.as_json
  end
end
