class HomeController < ApplicationController
  def index
    render inertia: 'Landing', props: {
      title: 'Genfix — Commercial Generator Hire'
    }
  end
end
