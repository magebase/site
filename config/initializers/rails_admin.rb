RailsAdmin.config do |config|
  config.asset_source = :vite

  # Exclude ChangeRequest from RailsAdmin to avoid enum conflict
  config.excluded_models = ['ChangeRequest']

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/railsadminteam/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  # BlogPost configuration
  config.model BlogPost do
    list do
      field :id
      field :title
      field :use_case_slug
      field :published
      field :published_at
      field :featured
      field :author_name
      field :created_at
    end

    show do
      field :id
      field :title
      field :content
      field :excerpt
      field :slug
      field :use_case_slug
      field :author_name
      field :author_title
      field :published
      field :published_at
      field :featured
      field :created_at
      field :updated_at
    end

    edit do
      field :title
      field :content
      field :excerpt
      field :use_case_slug
      field :author_name
      field :author_title
      field :published
      field :featured
    end

    export do
      field :title
      field :content
      field :excerpt
      field :use_case_slug
      field :author_name
      field :published
      field :published_at
      field :featured
    end
  end
end
