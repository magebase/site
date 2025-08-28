class AuthController < ApplicationController
  def signin
    render inertia: 'Auth/SignIn', props: {
      title: 'Sign In - Magebase'
    }
  end
end
