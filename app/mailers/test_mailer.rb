class TestMailer < ApplicationMailer
  def test_email
    @user = params[:user] || "Developer"
    @timestamp = Time.current

    mail(
      to: params[:to] || "test@example.com",
      subject: "Test Email from Rails Development Environment"
    )
  end

  def quote_notification
    @client_name = params[:client_name] || "Valued Client"
    @project_name = params[:project_name] || "Your Project"
    @timeline = params[:timeline] || "2-3 weeks"
    @cost = params[:cost] || "$5,000"
    @quote_url = params[:quote_url] || "https://magebase.dev/quote/123"

    mail(
      to: params[:to] || "client@example.com",
      subject: "Your Project Quote from Magebase"
    )
  end
end
