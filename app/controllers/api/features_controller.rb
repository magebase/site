class Api::FeaturesController < ApplicationController
  def index
    @features = Feature.all.order(:category, :name)
    render json: @features.as_json
  end
end
