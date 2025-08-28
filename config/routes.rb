Rails.application.routes.draw do
  namespace :api do
    get "features", to: "features#index"
    post "quotes/estimate", to: "quotes#estimate"
  end
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  # Blog routes
  get 'blog', to: 'blog#index'
  get 'blog/:slug', to: 'blog#show', as: :blog_post

  # Auth routes
  get 'signin', to: 'auth#signin'

  # Quote requests
  resources :quote_requests, only: [:index, :show, :new, :create, :update] do
    member do
      post :generate_quote
      post :accept_quote
      get :generate_pdf
      get :timeline_pdf
      get :timeline_csv
    end
  end

  # Services routes
  get 'services', to: 'services#index'
  get 'services/:slug', to: 'services#show', as: :service

  # Company routes
  get 'about', to: 'company#about'
  get 'team', to: 'company#team'
  get 'careers', to: 'company#careers'
  get 'careers/:slug', to: 'company#career_detail', as: :career

  # Case Studies routes
  get 'case-studies', to: 'case_studies#index'
  get 'case-studies/:slug', to: 'case_studies#show', as: :case_study

  # Resources routes
  get 'help-center', to: 'resources#help_center'
  get 'community', to: 'resources#community'
  get 'webinars', to: 'resources#webinars'
  get 'webinars/:slug', to: 'resources#webinar_detail', as: :webinar

  # Legal routes
  get 'privacy-policy', to: 'legal#privacy_policy'
  get 'terms-of-service', to: 'legal#terms_of_service'
  get 'cookie-policy', to: 'legal#cookie_policy'
  get 'gdpr', to: 'legal#gdpr'
  get 'security', to: 'legal#security'

  # Rails Admin
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # Other pages
  get 'inertia-example', to: 'inertia_example#index'

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"
end
