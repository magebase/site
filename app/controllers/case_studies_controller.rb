class CaseStudiesController < ApplicationController
  def index
    @case_studies = CaseStudy.published.order(position: :asc)
    render inertia: 'CaseStudiesIndex', props: {
      caseStudies: @case_studies.as_json(only: [:id, :title, :slug, :client_name, :industry, :challenge, :solution, :results, :excerpt, :client_logo_url, :featured_image_url])
    }
  end

  def show
    @case_study = CaseStudy.published.find_by!(slug: params[:slug])
    render inertia: 'CaseStudiesShow', props: {
      caseStudy: @case_study.as_json(only: [:id, :title, :slug, :client_name, :industry, :challenge, :solution, :results, :excerpt, :meta_title, :meta_description, :client_logo_url, :featured_image_url])
    }
  end
end
