class CompanyController < ApplicationController
  skip_before_action :authenticate_user!
  def about
    @page = Page.published.find_by(slug: 'about')
    render inertia: 'CompanyAbout', props: {
      page: @page&.as_json(only: [:title, :content, :excerpt])
    }
  end

  def team
    @team_members = TeamMember.active.ordered
    render inertia: 'CompanyTeam', props: {
      teamMembers: @team_members.as_json(only: [:id, :name, :position, :bio, :email, :phone, :linkedin_url, :twitter_url, :github_url, :profile_image_url])
    }
  end

  def careers
    @careers = Career.published.open.order(position: :asc)
    render inertia: 'CompanyCareers', props: {
      careers: @careers.as_json(only: [:id, :title, :slug, :description, :requirements, :location, :employment_type, :salary_range, :excerpt])
    }
  end

  def career_detail
    @career = Career.published.find_by!(slug: params[:slug])
    render inertia: 'CompanyCareerDetail', props: {
      career: @career.as_json(only: [:id, :title, :slug, :description, :requirements, :location, :employment_type, :salary_range, :excerpt, :meta_title, :meta_description])
    }
  end
end
