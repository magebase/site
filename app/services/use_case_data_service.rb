module UseCaseDataService
  USE_CASE_DATA = [
    {
      slug: "small-business-branded-site",
      title: "Small Business Branded Site",
      subtitle: "Establish your online presence with a professional, custom website",
      description: "Perfect for local businesses, startups, and entrepreneurs who need a strong digital foundation. Our custom branded sites combine beautiful design with powerful functionality to help you stand out from the competition.",
      features: [
        "Responsive Design",
        "Content Management System",
        "Contact Forms",
        "Social Media Integration",
        "SEO Optimization",
        "Google Analytics",
        "Mobile-First Approach",
        "Fast Loading Speed"
      ],
      category: "Business",
      complexity: "Low",
      estimated_timeline: "2-4 weeks",
      target_audience: "Small business owners, startups, local services",
      key_benefits: [
        "Professional online presence",
        "Easy content updates",
        "Mobile-responsive design",
        "SEO-optimized structure"
      ],
      technical_requirements: [
        "Domain name",
        "Hosting setup",
        "Content migration",
        "Brand guidelines"
      ],
      success_metrics: [
        "Increased online visibility",
        "Higher customer engagement",
        "Improved lead generation",
        "Better search engine rankings"
      ]
    },
    {
      slug: "e-commerce",
      title: "E-commerce Solutions",
      subtitle: "Build the next generation of online stores",
      description: "Comprehensive e-commerce development services for businesses looking to sell online. From simple product catalogs to complex multi-vendor marketplaces, we build scalable solutions that drive revenue.",
      features: [
        "Shopping Cart",
        "Payment Integration",
        "Inventory Management",
        "Order Processing",
        "Customer Accounts",
        "Product Reviews",
        "Analytics Dashboard",
        "Mobile Commerce"
      ],
      category: "Commerce",
      complexity: "High",
      estimated_timeline: "8-16 weeks",
      target_audience: "Retailers, manufacturers, service providers",
      key_benefits: [
        "Increased sales revenue",
        "Global market reach",
        "24/7 store availability",
        "Data-driven insights"
      ],
      technical_requirements: [
        "Product catalog",
        "Payment processor setup",
        "Shipping integration",
        "Tax calculation setup"
      ],
      success_metrics: [
        "Conversion rate improvement",
        "Average order value increase",
        "Customer acquisition cost reduction",
        "Cart abandonment reduction"
      ]
    },
    {
      slug: "food-delivery",
      title: "Food Delivery Platforms",
      subtitle: "Connect restaurants with hungry customers",
      description: "Complete food delivery solutions that streamline ordering, payment, and delivery logistics. Perfect for restaurants, food chains, and delivery services.",
      features: [
        "Restaurant Management",
        "Menu Management",
        "Order Tracking",
        "Delivery Logistics",
        "Payment Processing",
        "Customer Reviews",
        "Real-time Analytics",
        "Mobile Apps"
      ],
      category: "Delivery",
      complexity: "High",
      estimated_timeline: "12-20 weeks",
      target_audience: "Restaurants, food chains, delivery services",
      key_benefits: [
        "Increased order volume",
        "Reduced operational costs",
        "Improved customer satisfaction",
        "Real-time business insights"
      ],
      technical_requirements: [
        "Restaurant partnerships",
        "Delivery fleet setup",
        "Payment integration",
        "GPS tracking system"
      ],
      success_metrics: [
        "Order volume growth",
        "Delivery time reduction",
        "Customer retention rate",
        "Average order value"
      ]
    },
    {
      slug: "healthcare-management-system",
      title: "Healthcare Management Systems",
      subtitle: "Streamline healthcare operations with integrated management solutions",
      description: "Comprehensive healthcare management systems that improve patient care, streamline operations, and ensure compliance. From electronic health records to appointment scheduling.",
      features: [
        "Electronic Health Records",
        "Appointment Scheduling",
        "Patient Portal",
        "Billing & Insurance",
        "Inventory Management",
        "Staff Management",
        "Reporting & Analytics",
        "HIPAA Compliance"
      ],
      category: "Healthcare",
      complexity: "High",
      estimated_timeline: "16-24 weeks",
      target_audience: "Hospitals, clinics, healthcare providers",
      key_benefits: [
        "Improved patient care",
        "Operational efficiency",
        "Regulatory compliance",
        "Data-driven decisions"
      ],
      technical_requirements: [
        "HIPAA compliance setup",
        "Medical device integration",
        "Insurance provider APIs",
        "Patient data migration"
      ],
      success_metrics: [
        "Patient satisfaction scores",
        "Appointment no-show reduction",
        "Operational cost savings",
        "Treatment outcome improvements"
      ]
    },
    {
      slug: "financial-services-banking",
      title: "Financial Services & Banking",
      subtitle: "Secure and compliant financial technology solutions",
      description: "Banking and financial services platforms that meet regulatory requirements while providing excellent user experiences. From mobile banking to investment platforms.",
      features: [
        "Account Management",
        "Transaction Processing",
        "Security & Compliance",
        "Mobile Banking",
        "Investment Tools",
        "Risk Assessment",
        "Regulatory Reporting",
        "Fraud Detection"
      ],
      category: "Finance",
      complexity: "High",
      estimated_timeline: "20-32 weeks",
      target_audience: "Banks, fintech companies, investment firms",
      key_benefits: [
        "Regulatory compliance",
        "Enhanced security",
        "Improved customer experience",
        "Operational efficiency"
      ],
      technical_requirements: [
        "Regulatory compliance setup",
        "Security certifications",
        "Banking API integrations",
        "Fraud detection systems"
      ],
      success_metrics: [
        "Security incident reduction",
        "Customer satisfaction scores",
        "Transaction success rate",
        "Compliance audit results"
      ]
    }
  ].freeze

  def self.find_by_slug(slug)
    USE_CASE_DATA.find { |use_case| use_case[:slug] == slug }
  end

  def self.all
    USE_CASE_DATA
  end

  def self.by_category(category)
    USE_CASE_DATA.select { |use_case| use_case[:category] == category }
  end
end
