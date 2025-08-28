class AuthController < ApplicationController
  skip_before_action :authenticate_user!

  def signin
    render inertia: "Auth/SignIn", props: {
      title: "Sign In - Magebase"
    }
  end
end
