class ApplicationController < ActionController::Base
  before_action :authenticate_user!, except: [:index, :show]

  private

  def authenticate_user!
    # Only require authentication for protected routes
    # This can be customized based on your needs
  end
end
