class MagicLinksController < ApplicationController
  skip_before_action :authenticate_user!

  def authenticate
    user = User.find_by(magic_link_token: params[:token])

    if user&.magic_link_token_valid?
      # Clear the magic link token after successful authentication
      user.update!(magic_link_token: nil, magic_link_sent_at: nil)

      # Sign the user in
      sign_in(user)

      # Redirect to dashboard or wherever they should go after login
      redirect_to root_path, notice: "Welcome! You have been successfully signed in."
    else
      redirect_to root_path, alert: "This magic link is invalid or has expired. Please request a new one."
    end
  end

  def send_link
    email = params[:email]

    if email.present? && valid_email?(email)
      user = User.find_or_create_by!(email: email) do |u|
        u.password = Devise.friendly_token[0, 20]
        u.name = email.split("@").first.titleize
      end

      user.send_magic_link_email

      redirect_to root_path, notice: "Magic link sent! Check your email for the login link."
    else
      redirect_to root_path, alert: "Please provide a valid email address."
    end
  end

  private

  def valid_email?(email)
    email.match?(/\A[^@\s]+@[^@\s]+\z/)
  end
end
