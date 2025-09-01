class ResourcesController < ApplicationController
  skip_before_action :authenticate_user!

  def help_center
    @page = Page.published.find_by(slug: 'help-center')
    render inertia: 'ResourcesHelpCenter', props: {
      page: @page&.as_json(only: [:id, :title, :content, :excerpt, :meta_title, :meta_description])
    }
  end

  def community
    @page = Page.published.find_by(slug: 'community')
    render inertia: 'ResourcesCommunity', props: {
      page: @page&.as_json(only: [:title, :content, :excerpt])
    }
  end

  def webinars
    @webinars = Webinar.published.upcoming.order(scheduled_at: :asc)
    @past_webinars = Webinar.published.past.order(scheduled_at: :desc).limit(5)
    render inertia: 'ResourcesWebinarsIndex', props: {
      webinars: @webinars.as_json(only: [:id, :title, :slug, :description, :speaker_name, :speaker_bio, :scheduled_at, :duration_minutes, :registration_url, :excerpt, :speaker_image_url, :thumbnail_url]).map { |w| w.merge('is_upcoming' => w['scheduled_at'] > Time.current) },
      pastWebinars: @past_webinars.as_json(only: [:id, :title, :slug, :description, :speaker_name, :scheduled_at, :video_url]).map { |w| w.merge('is_upcoming' => false) }
    }
  end

  def webinar_detail
    @webinar = Webinar.published.find_by!(slug: params[:slug])
    render inertia: 'ResourcesWebinarDetail', props: {
      webinar: @webinar.as_json(only: [:id, :title, :slug, :description, :speaker_name, :speaker_bio, :scheduled_at, :duration_minutes, :registration_url, :video_url, :excerpt, :meta_title, :meta_description, :speaker_image_url, :thumbnail_url]).merge('is_upcoming' => @webinar.scheduled_at > Time.current)
    }
  end
end
