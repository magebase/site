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

  # Rails Admin
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # Other pages
  get 'inertia-example', to: 'inertia_example#index'

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"
end
