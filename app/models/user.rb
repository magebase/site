class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable,
         omniauth_providers: [ :google_oauth2 ]

  has_many :tenants

  # Magic link authentication
  before_create :generate_magic_link_token

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name
      user.avatar_url = auth.info.image
      # You can add more fields here based on the auth response
    end
  end

  # Generate a secure magic link token
  def generate_magic_link_token!
    update!(magic_link_token: SecureRandom.urlsafe_base64(32))
  end

  # Check if magic link token is valid (not expired)
  def magic_link_token_valid?
    return false unless magic_link_token.present? && magic_link_sent_at.present?
    magic_link_sent_at > 24.hours.ago
  end

  # Generate magic link URL
  def magic_link_url
    return nil unless magic_link_token.present?
    Rails.application.routes.url_helpers.magic_link_url(token: magic_link_token, host: ENV["APP_HOST"] || "localhost:3000")
  end

  # Send magic link email
  def send_magic_link_email(welcome_message = false)
    generate_magic_link_token!
    update!(magic_link_sent_at: Time.current)

    if welcome_message
      UserMailer.welcome_magic_link(self).deliver_later
    else
      UserMailer.magic_link(self).deliver_later
    end
  end

  private

  def generate_magic_link_token
    self.magic_link_token = SecureRandom.urlsafe_base64(32)
    self.magic_link_sent_at = Time.current
  end
end
