# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create sample blog posts
blog_posts = [
  {
    title: "The Ultimate Guide to Custom Web Application Development",
    content: "<h2>Why Businesses Need Custom Web Applications</h2><p>Custom web applications provide tailored solutions that off-the-shelf software cannot match. They integrate seamlessly with your existing systems and scale with your business growth.</p><h2>Choosing the Right Technology Stack</h2><p>The choice of technology depends on your specific requirements. Our team helps you select the best frameworks and tools for your project needs.</p><h2>Benefits of Professional Web Development</h2><ul><li>Scalable architecture</li><li>Modern user interfaces</li><li>API integrations</li><li>Ongoing support and maintenance</li></ul>",
    excerpt: "Learn everything you need to know about custom web application development, from planning to deployment.",
    published: true,
    author_name: "Sarah Mitchell",
    author_title: "Senior Full-Stack Developer",
    author_profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    title: "Mobile App Development: Native vs Cross-Platform Solutions",
    content: "<h2>Understanding Your Mobile App Options</h2><p>Choosing between native and cross-platform development depends on your target audience, budget, and timeline. Each approach has its advantages and trade-offs.</p><h2>Native App Development</h2><p>Native apps provide the best performance and user experience but require separate development for iOS and Android platforms.</p><h2>Cross-Platform Solutions</h2><p>Frameworks like React Native and Flutter allow code sharing across platforms, reducing development time and costs.</p>",
    excerpt: "Discover the differences between native and cross-platform mobile app development and choose the right approach for your project.",
    published: true,
    author_name: "Mike Johnson",
    author_title: "Mobile Development Lead",
    author_profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    title: "Cloud Migration: Moving Your Application to the Cloud",
    content: "<h2>Benefits of Cloud Migration</h2><p>Cloud migration offers scalability, cost savings, and improved reliability. Modern cloud platforms provide enterprise-grade infrastructure with pay-as-you-go pricing.</p><h2>Migration Strategies</h2><ul><li>Lift and shift</li><li>Refactoring for cloud optimization</li><li>Hybrid cloud approaches</li><li>Serverless architecture</li></ul><h2>Best Practices</h2><p>We follow industry best practices to ensure smooth migration with minimal downtime and maximum security.</p>",
    excerpt: "Learn about cloud migration strategies and how to successfully move your applications to modern cloud infrastructure.",
    published: true,
    author_name: "David Chen",
    author_title: "Cloud Solutions Architect",
    author_profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
]

# Create blog posts
blog_posts.each do |post_data|
  BlogPost.find_or_create_by!(title: post_data[:title]) do |post|
    post.content = post_data[:content]
    post.excerpt = post_data[:excerpt]
    post.published = post_data[:published]
    post.author_name = post_data[:author_name]
    post.author_title = post_data[:author_title]
    post.author_profile_picture = post_data[:author_profile_picture]
  end
end

blog_posts.each do |post_data|
  BlogPost.find_or_create_by!(title: post_data[:title]) do |post|
    post.content = post_data[:content]
    post.excerpt = post_data[:excerpt]
    post.published = post_data[:published]
    post.published_at = Time.current if post_data[:published]
  end
end

puts "Created #{blog_posts.size} sample blog posts"

# Create software development features
features = [
  # Authentication & Security
  {
    name: 'user_authentication',
    description: 'User registration, login, password reset, and session management',
    category: 'authentication',
    base_cost: 2000.00,
    complexity_level: 1,
    dependencies: [],
    requires_customization: false
  },
  {
    name: 'security_features',
    description: 'SSL, data encryption, CSRF protection, and security audits',
    category: 'security',
    base_cost: 3000.00,
    complexity_level: 2,
    dependencies: [],
    requires_customization: true
  },

  # Payment & Commerce
  {
    name: 'payment_processing',
    description: 'Integration with Stripe/PayPal, subscription management, invoicing',
    category: 'commerce',
    base_cost: 4000.00,
    complexity_level: 3,
    dependencies: ['user_authentication'],
    requires_customization: true
  },

  # User Interface
  {
    name: 'admin_dashboard',
    description: 'Administrative interface for managing content, users, and analytics',
    category: 'interface',
    base_cost: 3500.00,
    complexity_level: 2,
    dependencies: ['user_authentication'],
    requires_customization: true
  },
  {
    name: 'mobile_responsive',
    description: 'Responsive design that works perfectly on all device sizes',
    category: 'interface',
    base_cost: 1500.00,
    complexity_level: 1,
    dependencies: [],
    requires_customization: false
  },

  # Backend & API
  {
    name: 'standalone_developer_api_openapi_portal',
    description: 'Standalone Developer API + OpenAPI Portal for third-party integrations and documentation',
    category: 'backend',
    base_cost: 5000.00,
    complexity_level: 3,
    dependencies: [],
    requires_customization: true
  },
  {
    name: 'database_design',
    description: 'Database schema design, optimization, and data migration',
    category: 'backend',
    base_cost: 2500.00,
    complexity_level: 2,
    dependencies: [],
    requires_customization: true
  },
  {
    name: 'third_party_integrations',
    description: 'Integration with external APIs, webhooks, and services',
    category: 'backend',
    base_cost: 3500.00,
    complexity_level: 3,
    dependencies: [],
    requires_customization: true
  },

  # Real-time Features
  {
    name: 'real_time_features',
    description: 'WebSocket connections, live updates, notifications, and chat',
    category: 'real_time',
    base_cost: 6000.00,
    complexity_level: 4,
    dependencies: ['standalone_developer_api_openapi_portal'],
    requires_customization: true
  },

  # Analytics & Tracking
  {
    name: 'analytics_tracking',
    description: 'Google Analytics, custom event tracking, and user behavior analysis',
    category: 'analytics',
    base_cost: 2000.00,
    complexity_level: 2,
    dependencies: [],
    requires_customization: false
  },

  # AI & Machine Learning
  {
    name: 'ai_ml',
    description: 'Machine learning models, AI-powered features, and data processing',
    category: 'ai_ml',
    base_cost: 15000.00,
    complexity_level: 5,
    dependencies: ['standalone_developer_api_openapi_portal', 'database_design'],
    requires_customization: true
  },

  # Blockchain
  {
    name: 'blockchain',
    description: 'Smart contracts, cryptocurrency payments, NFT functionality',
    category: 'blockchain',
    base_cost: 20000.00,
    complexity_level: 5,
    dependencies: ['standalone_developer_api_openapi_portal'],
    requires_customization: true
  },

  # DevOps & Deployment
  {
    name: 'deployment_devops',
    description: 'CI/CD pipelines, cloud hosting, monitoring, and scaling',
    category: 'devops',
    base_cost: 4000.00,
    complexity_level: 3,
    dependencies: [],
    requires_customization: true
  },

  # Testing & Quality Assurance
  {
    name: 'testing_qa',
    description: 'Unit tests, integration tests, automated testing, and quality assurance',
    category: 'testing',
    base_cost: 3000.00,
    complexity_level: 2,
    dependencies: [],
    requires_customization: false
  },

  # Documentation & Support
  {
    name: 'documentation',
    description: 'Technical documentation, user guides, and API documentation',
    category: 'documentation',
    base_cost: 1500.00,
    complexity_level: 1,
    dependencies: [],
    requires_customization: false
  },
  {
    name: 'maintenance_support',
    description: 'Post-launch support, bug fixes, and feature updates (6 months)',
    category: 'support',
    base_cost: 5000.00,
    complexity_level: 2,
    dependencies: [],
    requires_customization: false
  },
  {
    name: 'gdpr_compliance',
    description: 'GDPR compliance implementation including data protection, consent management, and privacy controls',
    category: 'compliance',
    base_cost: 3000.00,
    complexity_level: 3,
    dependencies: [],
    requires_customization: true
  },
  {
    name: 'hipaa_compliance',
    description: 'HIPAA compliance for healthcare applications including PHI protection and security measures',
    category: 'compliance',
    base_cost: 5000.00,
    complexity_level: 4,
    dependencies: [],
    requires_customization: true
  }
]

# Create features
features.each do |feature_data|
  Feature.find_or_create_by!(name: feature_data[:name]) do |feature|
    feature.description = feature_data[:description]
    feature.category = feature_data[:category]
    feature.base_cost = feature_data[:base_cost]
    feature.complexity_level = feature_data[:complexity_level]
    feature.dependencies = feature_data[:dependencies]
    feature.requires_customization = feature_data[:requires_customization]
  end
end

puts "Created #{features.size} software development features"

# Create initial team capacity data
TeamCapacity.find_or_create_by!(last_updated: Date.current.beginning_of_day) do |capacity|
  capacity.total_developers = 5
  capacity.available_developers = 3
  capacity.current_projects = 2
  capacity.capacity_percentage = 60.0
  capacity.last_updated = Time.current
end

puts "Created initial team capacity data"
