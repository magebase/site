Rails.application.routes.draw do
  namespace :client do
    get "dashboard", to: "dashboard#index"
  end

  # Tenant creation (outside tenant scope)
  resources :tenants, only: [ :new, :create ]

  # Path-based tenant routing instead of subdomain constraints
  scope "/:tenant_name", constraints: { tenant_name: /[a-zA-Z0-9_-]+/ } do
    namespace :tenant do
      get "dashboard", to: "dashboard#index"
      resources :change_requests, only: [ :index, :new, :create, :show, :update ]
      resources :documents, only: [ :index, :new, :create, :show, :destroy ]
      get "billing", to: "billing#index"
    end
  end

  namespace :api do
    get "features", to: "features#index"
    post "quotes/estimate", to: "quotes#estimate"
  end

  devise_for :users, controllers: { omniauth_callbacks: "omniauth_callbacks" }

  # Blog routes
  get "blog", to: "blog#index"
  get "blog/use-case/:use_case_slug", to: "blog#use_case", as: :blog_use_case
  get "blog/:slug", to: "blog#show", as: :blog_post
  post "blog/generate/:use_case_slug", to: "blog#generate_post", as: :generate_blog_post

  # Magic link authentication
  get "magic_link/:token", to: "magic_links#authenticate", as: :magic_link
  post "magic_links/send", to: "magic_links#send_link", as: :send_magic_link

  # Quote requests
  resources :quote_requests, only: [ :index, :show, :new, :create, :update ] do
    member do
      post :generate_quote
      post :accept_quote
      get :timeline_pdf
      get :timeline_csv
    end
  end

  # Public proposal viewing (no authentication required)
  get "proposals/:slug", to: "proposals#show", as: :public_proposal
  post "proposals/:slug/accept", to: "proposals#accept", as: :accept_proposal

  # Services routes
  get "services", to: "services#index"
  get "services/:slug", to: "services#show", as: :service

  # Company routes
  get "about", to: "company#about"
  get "team", to: "company#team"
  get "careers", to: "company#careers"
  get "careers/:slug", to: "company#career_detail", as: :career

  # Case Studies routes
  get "case-studies", to: "case_studies#index"
  get "case-studies/:slug", to: "case_studies#show", as: :case_study

  # Use Cases routes
  get "use-cases", to: "use_cases#index"
  get "use-cases/:slug", to: "use_cases#show", as: :use_case

  # Resources routes
  get "help-center", to: "resources#help_center"
  get "community", to: "resources#community"
  get "webinars", to: "resources#webinars"
  get "webinars/:slug", to: "resources#webinar_detail", as: :webinar

  # Legal routes
  get "privacy-policy", to: "legal#privacy_policy"
  get "terms-of-service", to: "legal#terms_of_service"
  get "cookie-policy", to: "legal#cookie_policy"
  get "gdpr", to: "legal#gdpr"
  get "security", to: "legal#security"

  # Rails Admin
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"

  # Other pages
  get "inertia-example", to: "inertia_example#index"

  # Stripe webhooks
  post "webhooks/stripe", to: "webhooks#stripe"

  # Defines the root path route ("/")
  root "home#index"
end
