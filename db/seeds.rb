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
    use_case_slug: "web-development",
    author_name: "Sarah Mitchell",
    author_title: "Senior Full-Stack Developer",
    author_profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    title: "Mobile App Development: Native vs Cross-Platform Solutions",
    content: "<h2>Understanding Your Mobile App Options</h2><p>Choosing between native and cross-platform development depends on your target audience, budget, and timeline. Each approach has its advantages and trade-offs.</p><h2>Native App Development</h2><p>Native apps provide the best performance and user experience but require separate development for iOS and Android platforms.</p><h2>Cross-Platform Solutions</h2><p>Frameworks like React Native and Flutter allow code sharing across platforms, reducing development time and costs.</p>",
    excerpt: "Discover the differences between native and cross-platform mobile app development and choose the right approach for your project.",
    published: true,
    use_case_slug: "mobile-development",
    author_name: "Mike Johnson",
    author_title: "Mobile Development Lead",
    author_profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    title: "Cloud Migration: Moving Your Application to the Cloud",
    content: "<h2>Benefits of Cloud Migration</h2><p>Cloud migration offers scalability, cost savings, and improved reliability. Modern cloud platforms provide enterprise-grade infrastructure with pay-as-you-go pricing.</p><h2>Migration Strategies</h2><ul><li>Lift and shift</li><li>Refactoring for cloud optimization</li><li>Hybrid cloud approaches</li><li>Serverless architecture</li></ul><h2>Best Practices</h2><p>We follow industry best practices to ensure smooth migration with minimal downtime and maximum security.</p>",
    excerpt: "Learn about cloud migration strategies and how to successfully move your applications to modern cloud infrastructure.",
    published: true,
    use_case_slug: "cloud-migration",
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
    post.use_case_slug = post_data[:use_case_slug]
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
    post.use_case_slug = post_data[:use_case_slug]
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

  # Payment & Commerce
  {
    name: 'payment_processing',
    description: 'Integration with Stripe/PayPal, subscription management, invoicing',
    category: 'commerce',
    base_cost: 4000.00,
    complexity_level: 3,
    dependencies: [ 'user_authentication' ],
    requires_customization: true
  },

  # User Interface
  {
    name: 'admin_dashboard',
    description: 'Administrative interface for managing content, users, and analytics',
    category: 'interface',
    base_cost: 3500.00,
    complexity_level: 2,
    dependencies: [ 'user_authentication' ],
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
    dependencies: [ 'standalone_developer_api_openapi_portal' ],
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
    dependencies: [ 'standalone_developer_api_openapi_portal', 'database_design' ],
    requires_customization: true
  },

  # Blockchain
  {
    name: 'blockchain',
    description: 'Smart contracts, cryptocurrency payments, NFT functionality',
    category: 'blockchain',
    base_cost: 20000.00,
    complexity_level: 5,
    dependencies: [ 'standalone_developer_api_openapi_portal' ],
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
    name: '5_high_converting_seo_marketing_pages',
    description: '5 high converting, SEO optimized marketing pages including homepage, about, services, blog, and contact',
    category: 'marketing',
    base_cost: 2500.00,
    complexity_level: 2,
    dependencies: [],
    requires_customization: true
  },
  {
    name: 'igaming_gambling',
    description: 'iGaming platform with gambling features including game integration, betting systems, RNG compliance, and regulatory requirements',
    category: 'gaming',
    base_cost: 25000.00,
    complexity_level: 5,
    dependencies: [ 'payment_processing', 'user_authentication' ],
    requires_customization: true
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
  },
  {
    name: 'external_security_audit',
    description: 'Third-party security audit and penetration testing by certified security professionals',
    category: 'security',
    base_cost: 7500.00,
    complexity_level: 4,
    dependencies: [],
    requires_customization: false
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

# Create default CMS pages
cms_pages = [
  {
    title: "Community",
    slug: "community",
    content: "<h1>Join Our Developer Community</h1><p>Connect with developers from around the world, share knowledge, and grow together in our supportive community.</p><h2>Discussion Forums</h2><p>Join conversations with developers from around the world in our active discussion forums.</p><h2>Knowledge Base</h2><p>Access shared knowledge and best practices from our community of experts.</p><h2>Showcase</h2><p>Share your projects and get inspired by others' work.</p><h2>Mentorship</h2><p>Connect with experienced developers for guidance and support.</p>",
    excerpt: "Join our vibrant developer community to connect, learn, and grow together.",
    meta_title: "Developer Community | Magebase",
    meta_description: "Connect with developers worldwide, share knowledge, and grow together in our supportive community.",
    published: true,
    page_type: "resources",
    position: 1
  },
  {
    title: "Help Center",
    slug: "help-center",
    content: "<h1>Help Center & Documentation</h1><p>Get comprehensive help and support for all our services and features.</p><h2>Getting Started</h2><p>New to Magebase? Start here with our beginner-friendly guides.</p><h3>How to Request a Quote</h3><p>Fill out our interactive quote form to get a personalized project estimate. The form guides you through feature selection with real-time cost updates.</p><h3>Understanding Our Services</h3><p>We offer custom web application development, mobile apps, AI integration, blockchain solutions, and more.</p><h2>Quote & Pricing</h2><h3>Interactive Quote Form</h3><p>Use our feature-rich quote form to select the services you need. Choose from templates for common use cases like e-commerce, social networking, or fitness apps.</p><h3>Pricing Factors</h3><p>Pricing considers feature complexity, customization level, timeline requirements, and integration complexity.</p><h3>Available Templates</h3><ul><li>E-commerce platforms</li><li>Social networking apps</li><li>Tenant management systems</li><li>Fitness tracking apps</li><li>Casino/gaming applications</li><li>Sports betting platforms</li><li>Neo-banks/FinTech apps</li><li>Generator hire services</li><li>Tradesperson service apps</li><li>Doctor's offices</li><li>Veterinary clinics</li><li>Dispensaries</li><li>Digital marketing agencies</li><li>Educational platforms</li><li>Real estate applications</li><li>Logistics and delivery apps</li><li>Event management systems</li><li>Marketplace platforms</li><li>SaaS applications</li></ul><h2>Features & Services</h2><h3>Core Features</h3><ul><li>Admin dashboard</li><li>Blog/CMS functionality</li><li>Autoblogger (AI-powered content generation)</li><li>Redesign count (number of UI iterations)</li><li>App store release (iOS/Android)</li><li>External security audit</li><li>Customer service chatbot</li><li>Sales chatbot</li><li>Internationalization (i18n)</li><li>Stripe payment integration</li><li>Analytics integration</li><li>Automated digital marketing options</li><li>GDPR Compliance</li><li>Domain name setup</li><li>Custom integrations</li><li>API development</li><li>Database design</li><li>Performance optimization</li><li>SEO optimization</li><li>Mobile responsiveness</li><li>Accessibility compliance</li></ul><h3>Advanced Features</h3><ul><li>Real-time features (WebSocket)</li><li>AI/ML integration</li><li>Blockchain functionality</li><li>DevOps & deployment</li><li>Testing & QA</li></ul><h2>Technical Information</h2><h3>Technology Stack</h3><p>Backend: Ruby on Rails 8+, PostgreSQL<br>Frontend: React 18+, Inertia.js, Tailwind CSS<br>Deployment: Kamal to Fly.io</p><h3>Integrations</h3><ul><li>Stripe payment processing</li><li>Discord webhooks</li><li>AI service (RubyLLM)</li><li>Email service</li></ul><h2>Payment & Contracts</h2><h3>Payment Process</h3><p>Deposit payment required to start development. Milestone-based releases available.</p><h3>Contract Terms</h3><p>All contracts use Wyoming jurisdiction. AI-generated clauses with legal compliance checks.</p><h2>Developer Allocation</h2><p>Automatic developer allocation with Discord notifications and project details securely shared.</p><h2>Support & Maintenance</h2><h3>Post-Launch Support</h3><p>6-month maintenance package includes bug fixes and small feature updates.</p><h3>Contact Support</h3><p>Need help? Contact our support team for assistance with your project.</p>",
    excerpt: "Comprehensive help center with documentation, guides, and support for all Magebase services.",
    meta_title: "Help Center & Documentation | Magebase",
    meta_description: "Get comprehensive help and support with detailed documentation, guides, and resources for all Magebase services.",
    published: true,
    page_type: "resources",
    position: 2
  },
  {
    title: "About Us",
    slug: "about",
    content: "<h1>About Magebase</h1><p>We are a leading custom software development company specializing in web applications, mobile apps, and digital solutions.</p><h2>Our Mission</h2><p>To empower businesses with innovative software solutions that drive growth and success.</p><h2>Our Team</h2><p>Our experienced team of developers, designers, and strategists work together to deliver exceptional results.</p><h2>Our Values</h2><p>Quality, innovation, collaboration, and customer satisfaction are at the core of everything we do.</p>",
    excerpt: "Learn about Magebase, our mission, team, and commitment to delivering exceptional software solutions.",
    meta_title: "About Us | Magebase",
    meta_description: "Learn about Magebase, our mission, team, and commitment to delivering exceptional software solutions.",
    published: true,
    page_type: "company",
    position: 1
  },
  {
    title: "Cookie Policy",
    slug: "cookie-policy",
    content: "<h1>Cookie Policy</h1><p>This Cookie Policy explains how we use cookies and similar technologies on our website.</p><h2>What Are Cookies</h2><p>Cookies are small text files that are stored on your device when you visit our website.</p><h2>How We Use Cookies</h2><p>We use cookies to enhance your browsing experience, analyze website traffic, and personalize content.</p><h2>Types of Cookies We Use</h2><ul><li>Essential cookies for website functionality</li><li>Analytics cookies to understand how you use our site</li><li>Marketing cookies to show relevant advertisements</li></ul><h2>Managing Cookies</h2><p>You can control and manage cookies through your browser settings.</p>",
    excerpt: "Learn about how we use cookies and similar technologies on our website.",
    meta_title: "Cookie Policy | Magebase",
    meta_description: "Learn about how we use cookies and similar technologies on our website.",
    published: true,
    page_type: "legal",
    position: 1
  },
  {
    title: "GDPR Compliance",
    slug: "gdpr",
    content: "<h1>GDPR Compliance</h1><p>We are committed to protecting your personal data and complying with GDPR regulations.</p><h2>Your Rights Under GDPR</h2><p>You have the right to access, rectify, erase, and port your personal data.</p><h2>How We Protect Your Data</h2><p>We implement appropriate technical and organizational measures to protect your personal data.</p><h2>Data Processing</h2><p>We only process your data for legitimate purposes and with your consent where required.</p><h2>Contact Our DPO</h2><p>If you have questions about your data or our GDPR compliance, please contact our Data Protection Officer.</p>",
    excerpt: "Learn about our GDPR compliance and how we protect your personal data.",
    meta_title: "GDPR Compliance | Magebase",
    meta_description: "Learn about our GDPR compliance and how we protect your personal data.",
    published: true,
    page_type: "legal",
    position: 2
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    content: "<h1>Privacy Policy</h1><p>This Privacy Policy describes how we collect, use, and protect your personal information.</p><h2>Information We Collect</h2><p>We collect information you provide directly to us and automatically through your use of our services.</p><h2>How We Use Your Information</h2><p>We use your information to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p><h2>Information Sharing</h2><p>We do not sell, trade, or rent your personal information to third parties.</p><h2>Data Security</h2><p>We implement appropriate security measures to protect your personal information.</p>",
    excerpt: "Learn about how we collect, use, and protect your personal information.",
    meta_title: "Privacy Policy | Magebase",
    meta_description: "Learn about how we collect, use, and protect your personal information.",
    published: true,
    page_type: "legal",
    position: 3
  },
  {
    title: "Security Information",
    slug: "security",
    content: "<h1>Security Information</h1><p>Learn about our security practices and how we protect your data and applications.</p><h2>Our Security Approach</h2><p>We follow industry best practices and implement multiple layers of security.</p><h2>Data Protection</h2><p>Your data is encrypted both in transit and at rest using industry-standard encryption.</p><h2>Access Controls</h2><p>We implement role-based access controls and multi-factor authentication.</p><h2>Security Audits</h2><p>We regularly conduct security audits and penetration testing.</p><h2>Incident Response</h2><p>We have established incident response procedures to quickly address any security issues.</p>",
    excerpt: "Learn about our security practices and how we protect your data and applications.",
    meta_title: "Security Information | Magebase",
    meta_description: "Learn about our security practices and how we protect your data and applications.",
    published: true,
    page_type: "legal",
    position: 4
  },
  {
    title: "Terms of Service",
    slug: "terms-of-service",
    content: "<h1>Terms of Service</h1><p>These Terms of Service govern your use of our services and website.</p><h2>Acceptance of Terms</h2><p>By accessing and using our services, you accept and agree to be bound by these terms.</p><h2>Use of Services</h2><p>You agree to use our services only for lawful purposes and in accordance with these terms.</p><h2>User Responsibilities</h2><p>You are responsible for maintaining the confidentiality of your account and password.</p><h2>Intellectual Property</h2><p>All content and materials on our platform are protected by intellectual property laws.</p><h2>Limitation of Liability</h2><p>Our liability is limited to the maximum extent permitted by applicable law.</p>",
    excerpt: "Read our terms of service that govern your use of our services and website.",
    meta_title: "Terms of Service | Magebase",
    meta_description: "Read our terms of service that govern your use of our services and website.",
    published: true,
    page_type: "legal",
    position: 5
  }
]

# Create CMS pages
cms_pages.each do |page_data|
  Page.find_or_create_by!(slug: page_data[:slug]) do |page|
    page.title = page_data[:title]
    page.content = page_data[:content]
    page.excerpt = page_data[:excerpt]
    page.meta_title = page_data[:meta_title]
    page.meta_description = page_data[:meta_description]
    page.published = page_data[:published]
    page.page_type = page_data[:page_type]
    page.position = page_data[:position]
  end
end

puts "Created #{cms_pages.size} default CMS pages"
