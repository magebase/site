class UserMailer < ApplicationMailer
  default from: "hello@magebase.site"

  def magic_link(user)
    @user = user
    @magic_link_url = user.magic_link_url

    mail(
      to: @user.email,
      subject: "Your Magic Link to Sign In"
    )
  end

  def welcome_magic_link(user)
    @user = user
    @magic_link_url = user.magic_link_url

    mail(
      to: @user.email,
      subject: "Welcome to Magebase! Your Account is Ready"
    )
  end
end
