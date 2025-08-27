class AddNewFeaturesToFeatures < ActiveRecord::Migration[8.0]
  def change
    # Add new features
    Feature.create([
      { name: 'google_play_store_ios', description: 'App store release for iOS and Android platforms', category: 'deployment', base_cost: 5000.00, complexity_level: 4, dependencies: [], requires_customization: true },
      { name: 'pwa', description: 'Progressive Web App functionality', category: 'frontend', base_cost: 1500.00, complexity_level: 2, dependencies: [], requires_customization: false },
      { name: 'blog_cms', description: 'Blog and CMS functionality', category: 'content', base_cost: 2000.00, complexity_level: 3, dependencies: [], requires_customization: true },
      { name: 'sales_chatbot', description: 'AI-powered sales chatbot', category: 'ai', base_cost: 3000.00, complexity_level: 4, dependencies: ['ai_integration'], requires_customization: true },
      { name: 'customer_support_chatbot', description: 'AI-powered customer support chatbot', category: 'ai', base_cost: 3000.00, complexity_level: 4, dependencies: ['ai_integration'], requires_customization: true },
      { name: 'internationalization', description: 'Multi-language support', category: 'frontend', base_cost: 2500.00, complexity_level: 3, dependencies: [], requires_customization: true },
      { name: 'crm', description: 'Customer Relationship Management system', category: 'backend', base_cost: 4000.00, complexity_level: 4, dependencies: ['database_design'], requires_customization: true },
      { name: 'social_login', description: 'Social media login integration', category: 'authentication', base_cost: 1000.00, complexity_level: 2, dependencies: [], requires_customization: false },
      { name: 'sso', description: 'Single Sign-On functionality', category: 'authentication', base_cost: 2000.00, complexity_level: 3, dependencies: [], requires_customization: true },
      { name: 'analytics_dashboard', description: 'Analytics and reporting dashboard', category: 'backend', base_cost: 2500.00, complexity_level: 3, dependencies: [], requires_customization: true }
    ])
  end
end
