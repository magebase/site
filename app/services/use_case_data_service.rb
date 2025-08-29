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
    },
    {
      slug: "equipment-hire",
      title: "Equipment Hire Platforms",
      subtitle: "Connect equipment owners with renters",
      description: "Equipment rental platforms that make it easy to list, book, and manage equipment rentals. Perfect for construction, industrial, and specialty equipment.",
      features: [
        "Equipment Listings",
        "Booking Management",
        "Payment Processing",
        "Rental Agreements",
        "Equipment Tracking",
        "Maintenance Scheduling",
        "Insurance Integration",
        "Mobile Apps"
      ],
      category: "Rental",
      complexity: "Medium",
      estimated_timeline: "10-16 weeks",
      target_audience: "Equipment owners, construction companies, industrial users",
      key_benefits: [
        "Increased equipment utilization",
        "Reduced downtime",
        "Streamlined rental process",
        "Better equipment management"
      ],
      technical_requirements: [
        "Equipment catalog setup",
        "Booking system integration",
        "Payment processing",
        "Insurance API integration"
      ],
      success_metrics: [
        "Equipment utilization rate",
        "Booking conversion rate",
        "Customer satisfaction",
        "Maintenance cost reduction"
      ]
    },
    {
      slug: "gambling-or-igaming",
      title: "Gambling & iGaming Platforms",
      subtitle: "Compliant and engaging gaming experiences",
      description: "Regulated online gaming platforms with responsible gambling features, secure payment processing, and engaging user experiences.",
      features: [
        "Game Integration",
        "Responsible Gambling Tools",
        "Payment Processing",
        "KYC & AML Compliance",
        "Live Dealer Support",
        "Mobile Gaming",
        "Analytics Dashboard",
        "Regulatory Reporting"
      ],
      category: "Gaming",
      complexity: "High",
      estimated_timeline: "16-24 weeks",
      target_audience: "Gaming operators, casinos, betting companies",
      key_benefits: [
        "Regulatory compliance",
        "Enhanced player engagement",
        "Secure transactions",
        "Responsible gambling support"
      ],
      technical_requirements: [
        "Gaming license compliance",
        "Game API integrations",
        "Payment security setup",
        "Responsible gambling tools"
      ],
      success_metrics: [
        "Player retention rate",
        "Revenue per player",
        "Compliance audit results",
        "Responsible gambling metrics"
      ]
    },
    {
      slug: "digital-marketing-agency-site",
      title: "Digital Marketing Agency Sites",
      subtitle: "Showcase your marketing expertise online",
      description: "Professional websites for digital marketing agencies that demonstrate their capabilities, showcase case studies, and attract new clients.",
      features: [
        "Portfolio Showcase",
        "Case Study Management",
        "Service Pages",
        "Blog Integration",
        "Lead Generation Forms",
        "Client Portal",
        "Analytics Integration",
        "SEO Optimization"
      ],
      category: "Marketing",
      complexity: "Medium",
      estimated_timeline: "6-10 weeks",
      target_audience: "Digital marketing agencies, consultants",
      key_benefits: [
        "Lead generation",
        "Professional credibility",
        "Case study presentation",
        "Client acquisition"
      ],
      technical_requirements: [
        "Portfolio content",
        "Case study data",
        "Lead tracking setup",
        "Analytics integration"
      ],
      success_metrics: [
        "Lead generation rate",
        "Client acquisition cost",
        "Portfolio engagement",
        "Conversion rate"
      ]
    },
    {
      slug: "cryptocurrency-exchange",
      title: "Cryptocurrency Exchanges",
      subtitle: "Secure and compliant crypto trading platforms",
      description: "Full-featured cryptocurrency exchanges with advanced trading tools, security features, and regulatory compliance.",
      features: [
        "Trading Engine",
        "Wallet Integration",
        "Security Features",
        "KYC & AML Compliance",
        "Liquidity Management",
        "API Trading",
        "Mobile Apps",
        "Regulatory Reporting"
      ],
      category: "Finance",
      complexity: "High",
      estimated_timeline: "24-36 weeks",
      target_audience: "Crypto exchanges, trading platforms",
      key_benefits: [
        "Regulatory compliance",
        "Enhanced security",
        "High trading volume",
        "User trust"
      ],
      technical_requirements: [
        "Exchange license compliance",
        "Trading engine setup",
        "Security certifications",
        "Liquidity provider integration"
      ],
      success_metrics: [
        "Trading volume",
        "Security incident rate",
        "User retention",
        "Regulatory compliance"
      ]
    },
    {
      slug: "fitness-and-wellness",
      title: "Fitness & Wellness Platforms",
      subtitle: "Connect fitness professionals with clients",
      description: "Comprehensive fitness platforms for personal trainers, gyms, and wellness professionals to manage clients, schedules, and payments.",
      features: [
        "Client Management",
        "Schedule Booking",
        "Payment Processing",
        "Progress Tracking",
        "Workout Plans",
        "Nutrition Tracking",
        "Mobile Apps",
        "Integration APIs"
      ],
      category: "Health",
      complexity: "Medium",
      estimated_timeline: "10-16 weeks",
      target_audience: "Personal trainers, gyms, wellness professionals",
      key_benefits: [
        "Client retention",
        "Revenue growth",
        "Operational efficiency",
        "Client satisfaction"
      ],
      technical_requirements: [
        "Client data management",
        "Payment integration",
        "Mobile app development",
        "API integrations"
      ],
      success_metrics: [
        "Client retention rate",
        "Revenue per client",
        "Booking conversion rate",
        "Client satisfaction scores"
      ]
    },
    {
      slug: "service-booking",
      title: "Service Booking Platforms",
      subtitle: "Streamline service appointments and bookings",
      description: "Service booking platforms that allow customers to easily schedule appointments, make payments, and manage their service history.",
      features: [
        "Appointment Scheduling",
        "Service Management",
        "Payment Processing",
        "Customer Portal",
        "Staff Management",
        "Calendar Integration",
        "Automated Reminders",
        "Reporting Dashboard"
      ],
      category: "Service",
      complexity: "Medium",
      estimated_timeline: "8-14 weeks",
      target_audience: "Service businesses, consultants, professionals",
      key_benefits: [
        "Reduced no-shows",
        "Increased bookings",
        "Operational efficiency",
        "Better customer experience"
      ],
      technical_requirements: [
        "Service catalog setup",
        "Calendar integration",
        "Payment processing",
        "Customer communication tools"
      ],
      success_metrics: [
        "Booking conversion rate",
        "No-show reduction",
        "Customer satisfaction",
        "Revenue growth"
      ]
    },
    {
      slug: "telemedicine",
      title: "Telemedicine Platforms",
      subtitle: "Connect healthcare providers with patients remotely",
      description: "Telemedicine platforms that enable secure video consultations, appointment management, and electronic health record integration.",
      features: [
        "Video Consultations",
        "Appointment Scheduling",
        "Electronic Health Records",
        "Payment Processing",
        "Prescription Management",
        "HIPAA Compliance",
        "Mobile Apps",
        "Integration APIs"
      ],
      category: "Healthcare",
      complexity: "High",
      estimated_timeline: "16-24 weeks",
      target_audience: "Healthcare providers, telemedicine companies",
      key_benefits: [
        "Increased patient access",
        "Reduced costs",
        "Better patient outcomes",
        "Regulatory compliance"
      ],
      technical_requirements: [
        "HIPAA compliance setup",
        "Video platform integration",
        "EHR system integration",
        "Secure payment processing"
      ],
      success_metrics: [
        "Patient satisfaction",
        "Appointment completion rate",
        "Revenue growth",
        "Patient retention"
      ]
    },
    {
      slug: "educational",
      title: "Educational Platforms",
      subtitle: "Create engaging learning experiences",
      description: "Educational platforms for schools, universities, and training organizations to deliver courses, track progress, and manage students.",
      features: [
        "Course Management",
        "Student Portal",
        "Progress Tracking",
        "Assessment Tools",
        "Video Content",
        "Discussion Forums",
        "Certification Management",
        "Analytics Dashboard"
      ],
      category: "Education",
      complexity: "Medium",
      estimated_timeline: "12-18 weeks",
      target_audience: "Schools, universities, training organizations",
      key_benefits: [
        "Improved learning outcomes",
        "Increased enrollment",
        "Operational efficiency",
        "Better student engagement"
      ],
      technical_requirements: [
        "Course content setup",
        "Student management system",
        "Assessment tools",
        "Video hosting integration"
      ],
      success_metrics: [
        "Student completion rate",
        "Learning outcome improvement",
        "Student satisfaction",
        "Enrollment growth"
      ]
    },
    {
      slug: "e-learning",
      title: "E-Learning Platforms",
      subtitle: "Deliver online courses and training programs",
      description: "Comprehensive e-learning platforms for creating, delivering, and managing online courses with interactive content and assessment tools.",
      features: [
        "Course Builder",
        "Interactive Content",
        "Assessment System",
        "Student Progress Tracking",
        "Discussion Forums",
        "Mobile Learning",
        "Certification",
        "Analytics & Reporting"
      ],
      category: "Education",
      complexity: "Medium",
      estimated_timeline: "10-16 weeks",
      target_audience: "Educators, training companies, corporations",
      key_benefits: [
        "Scalable education delivery",
        "Cost-effective training",
        "Interactive learning experience",
        "Comprehensive analytics"
      ],
      technical_requirements: [
        "Course content creation",
        "Interactive media tools",
        "Assessment system setup",
        "Student tracking system"
      ],
      success_metrics: [
        "Course completion rate",
        "Student engagement",
        "Learning effectiveness",
        "Revenue growth"
      ]
    },
    {
      slug: "business-management-software",
      title: "Business Management Software",
      subtitle: "Streamline business operations and management",
      description: "Comprehensive business management software that integrates various business functions including CRM, inventory, finance, and operations.",
      features: [
        "CRM Integration",
        "Inventory Management",
        "Financial Management",
        "Project Management",
        "Reporting Dashboard",
        "User Management",
        "API Integrations",
        "Mobile Access"
      ],
      category: "Business",
      complexity: "High",
      estimated_timeline: "16-24 weeks",
      target_audience: "Businesses, enterprises, management teams",
      key_benefits: [
        "Operational efficiency",
        "Better decision making",
        "Cost reduction",
        "Improved collaboration"
      ],
      technical_requirements: [
        "Business process analysis",
        "Data integration",
        "User role management",
        "Reporting system setup"
      ],
      success_metrics: [
        "Operational efficiency improvement",
        "Cost savings",
        "User adoption rate",
        "Decision-making speed"
      ]
    },
    {
      slug: "customer-relationship-management",
      title: "Customer Relationship Management",
      subtitle: "Manage customer interactions and relationships",
      description: "CRM systems that help businesses manage customer data, interactions, sales processes, and marketing campaigns effectively.",
      features: [
        "Contact Management",
        "Sales Pipeline",
        "Marketing Automation",
        "Customer Support",
        "Analytics Dashboard",
        "Email Integration",
        "Task Management",
        "Mobile Access"
      ],
      category: "Business",
      complexity: "Medium",
      estimated_timeline: "12-18 weeks",
      target_audience: "Sales teams, marketing teams, customer service",
      key_benefits: [
        "Improved customer relationships",
        "Increased sales efficiency",
        "Better customer insights",
        "Enhanced customer service"
      ],
      technical_requirements: [
        "Customer data integration",
        "Sales process setup",
        "Marketing automation",
        "Customer support tools"
      ],
      success_metrics: [
        "Customer satisfaction",
        "Sales conversion rate",
        "Customer retention",
        "Revenue growth"
      ]
    },
    {
      slug: "project-management-tool",
      title: "Project Management Tools",
      subtitle: "Manage projects efficiently from start to finish",
      description: "Project management platforms that help teams plan, execute, and track projects with collaboration tools and reporting capabilities.",
      features: [
        "Project Planning",
        "Task Management",
        "Team Collaboration",
        "Time Tracking",
        "Resource Management",
        "Reporting Dashboard",
        "File Management",
        "Integration APIs"
      ],
      category: "Business",
      complexity: "Medium",
      estimated_timeline: "10-16 weeks",
      target_audience: "Project managers, teams, organizations",
      key_benefits: [
        "Improved project delivery",
        "Better team collaboration",
        "Resource optimization",
        "Increased productivity"
      ],
      technical_requirements: [
        "Project workflow design",
        "Team management setup",
        "Integration requirements",
        "Reporting system"
      ],
      success_metrics: [
        "Project delivery on time",
        "Team productivity",
        "Resource utilization",
        "Client satisfaction"
      ]
    },
    {
      slug: "ride-sharing",
      title: "Ride-Sharing Platforms",
      subtitle: "Connect drivers with passengers efficiently",
      description: "Ride-sharing platforms that connect drivers with passengers, manage payments, and provide real-time tracking and safety features.",
      features: [
        "Ride Matching",
        "Real-time Tracking",
        "Payment Processing",
        "Driver Management",
        "Safety Features",
        "Rating System",
        "Route Optimization",
        "Mobile Apps"
      ],
      category: "Transportation",
      complexity: "High",
      estimated_timeline: "16-24 weeks",
      target_audience: "Transportation companies, ride-sharing services",
      key_benefits: [
        "Increased ride efficiency",
        "Better driver utilization",
        "Enhanced safety",
        "Improved customer experience"
      ],
      technical_requirements: [
        "GPS tracking system",
        "Payment integration",
        "Driver verification",
        "Safety protocols"
      ],
      success_metrics: [
        "Ride completion rate",
        "Driver utilization",
        "Customer satisfaction",
        "Safety incident rate"
      ]
    },
    {
      slug: "logistics-and-delivery",
      title: "Logistics & Delivery Platforms",
      subtitle: "Streamline logistics and delivery operations",
      description: "Logistics platforms that manage shipments, track deliveries, optimize routes, and provide real-time visibility into supply chain operations.",
      features: [
        "Shipment Tracking",
        "Route Optimization",
        "Warehouse Management",
        "Delivery Scheduling",
        "Real-time Updates",
        "Integration APIs",
        "Analytics Dashboard",
        "Mobile Apps"
      ],
      category: "Logistics",
      complexity: "High",
      estimated_timeline: "16-24 weeks",
      target_audience: "Logistics companies, delivery services, warehouses",
      key_benefits: [
        "Improved delivery efficiency",
        "Reduced costs",
        "Better customer visibility",
        "Operational optimization"
      ],
      technical_requirements: [
        "GPS tracking integration",
        "Route optimization algorithms",
        "Warehouse management system",
        "Real-time communication"
      ],
      success_metrics: [
        "On-time delivery rate",
        "Cost per delivery",
        "Customer satisfaction",
        "Operational efficiency"
      ]
    },
    {
      slug: "appointment-scheduling",
      title: "Appointment Scheduling Systems",
      subtitle: "Streamline appointment booking and management",
      description: "Appointment scheduling systems that allow customers to book appointments online, manage calendars, and automate reminders.",
      features: [
        "Online Booking",
        "Calendar Management",
        "Automated Reminders",
        "Staff Scheduling",
        "Customer Portal",
        "Payment Integration",
        "Reporting Dashboard",
        "Mobile Access"
      ],
      category: "Service",
      complexity: "Low",
      estimated_timeline: "6-10 weeks",
      target_audience: "Service businesses, healthcare, consultants",
      key_benefits: [
        "Reduced no-shows",
        "Better time management",
        "Increased bookings",
        "Improved customer experience"
      ],
      technical_requirements: [
        "Calendar integration",
        "Customer management",
        "Communication tools",
        "Payment processing"
      ],
      success_metrics: [
        "Booking conversion rate",
        "No-show reduction",
        "Customer satisfaction",
        "Revenue growth"
      ]
    },
    {
      slug: "social-networking",
      title: "Social Networking Platforms",
      subtitle: "Build communities and connect people",
      description: "Social networking platforms that enable user connections, content sharing, messaging, and community building with moderation tools.",
      features: [
        "User Profiles",
        "Content Sharing",
        "Messaging System",
        "Friend Connections",
        "Groups & Communities",
        "Moderation Tools",
        "Analytics Dashboard",
        "Mobile Apps"
      ],
      category: "Social",
      complexity: "High",
      estimated_timeline: "20-32 weeks",
      target_audience: "Communities, organizations, social platforms",
      key_benefits: [
        "User engagement",
        "Community growth",
        "Content moderation",
        "Monetization opportunities"
      ],
      technical_requirements: [
        "User management system",
        "Content moderation",
        "Scalable architecture",
        "Security features"
      ],
      success_metrics: [
        "User retention rate",
        "Content engagement",
        "Community growth",
        "Revenue per user"
      ]
    },
    {
      slug: "video-gaming",
      title: "Video Gaming Platforms",
      subtitle: "Create immersive gaming experiences",
      description: "Gaming platforms for multiplayer games, tournaments, leaderboards, and social gaming features with real-time interactions.",
      features: [
        "Game Engine Integration",
        "Multiplayer Support",
        "Tournament Management",
        "Leaderboards",
        "Social Features",
        "Payment Integration",
        "Analytics Dashboard",
        "Mobile Gaming"
      ],
      category: "Gaming",
      complexity: "High",
      estimated_timeline: "20-32 weeks",
      target_audience: "Game developers, gaming companies",
      key_benefits: [
        "Player engagement",
        "Revenue growth",
        "Community building",
        "Competitive gaming"
      ],
      technical_requirements: [
        "Game engine integration",
        "Real-time multiplayer",
        "Tournament systems",
        "Payment processing"
      ],
      success_metrics: [
        "Player retention",
        "Revenue per player",
        "Tournament participation",
        "Community engagement"
      ]
    },
    {
      slug: "event-management-system",
      title: "Event Management Systems",
      subtitle: "Plan and manage events efficiently",
      description: "Event management platforms for creating events, managing registrations, processing payments, and coordinating event logistics.",
      features: [
        "Event Creation",
        "Registration Management",
        "Payment Processing",
        "Attendee Management",
        "Ticketing System",
        "Event Analytics",
        "Mobile Apps",
        "Integration APIs"
      ],
      category: "Events",
      complexity: "Medium",
      estimated_timeline: "12-18 weeks",
      target_audience: "Event organizers, conference planners, venues",
      key_benefits: [
        "Streamlined event planning",
        "Increased registrations",
        "Better attendee experience",
        "Revenue growth"
      ],
      technical_requirements: [
        "Event management workflow",
        "Payment integration",
        "Attendee communication",
        "Analytics setup"
      ],
      success_metrics: [
        "Registration conversion rate",
        "Attendee satisfaction",
        "Event revenue",
        "Repeat attendance"
      ]
    },
    {
      slug: "content-management-system",
      title: "Content Management Systems",
      subtitle: "Create and manage digital content effectively",
      description: "CMS platforms that enable users to create, manage, and publish digital content with workflow management and collaboration tools.",
      features: [
        "Content Creation",
        "Workflow Management",
        "User Permissions",
        "Version Control",
        "SEO Tools",
        "Media Management",
        "Publishing Workflow",
        "Analytics Integration"
      ],
      category: "Content",
      complexity: "Medium",
      estimated_timeline: "10-16 weeks",
      target_audience: "Content creators, publishers, organizations",
      key_benefits: [
        "Efficient content creation",
        "Improved collaboration",
        "Better content quality",
        "Faster publishing"
      ],
      technical_requirements: [
        "Content workflow design",
        "User permission system",
        "Media management",
        "Publishing automation"
      ],
      success_metrics: [
        "Content publishing speed",
        "Content quality improvement",
        "User engagement",
        "SEO performance"
      ]
    },
    {
      slug: "inventory-management-system",
      title: "Inventory Management Systems",
      subtitle: "Track and manage inventory efficiently",
      description: "Inventory management systems that track stock levels, manage orders, optimize inventory, and provide real-time visibility into inventory status.",
      features: [
        "Stock Tracking",
        "Order Management",
        "Inventory Optimization",
        "Supplier Management",
        "Reporting Dashboard",
        "Barcode Integration",
        "Mobile Access",
        "Integration APIs"
      ],
      category: "Inventory",
      complexity: "Medium",
      estimated_timeline: "10-16 weeks",
      target_audience: "Retailers, warehouses, manufacturers",
      key_benefits: [
        "Reduced stockouts",
        "Optimized inventory levels",
        "Improved order fulfillment",
        "Better supplier management"
      ],
      technical_requirements: [
        "Inventory data integration",
        "Barcode system setup",
        "Supplier management",
        "Reporting system"
      ],
      success_metrics: [
        "Stockout reduction",
        "Inventory turnover",
        "Order fulfillment rate",
        "Cost savings"
      ]
    },
    {
      slug: "learning-management-system",
      title: "Learning Management Systems",
      subtitle: "Deliver and track online learning programs",
      description: "LMS platforms for creating courses, managing students, tracking progress, and delivering educational content with assessment tools.",
      features: [
        "Course Management",
        "Student Enrollment",
        "Progress Tracking",
        "Assessment Tools",
        "Certification Management",
        "Discussion Forums",
        "Mobile Learning",
        "Reporting Dashboard"
      ],
      category: "Education",
      complexity: "Medium",
      estimated_timeline: "12-18 weeks",
      target_audience: "Educational institutions, corporate training",
      key_benefits: [
        "Scalable learning delivery",
        "Progress tracking",
        "Certification management",
        "Student engagement"
      ],
      technical_requirements: [
        "Course content structure",
        "Student management system",
        "Assessment system",
        "Progress tracking"
      ],
      success_metrics: [
        "Course completion rate",
        "Student satisfaction",
        "Learning effectiveness",
        "Certification rates"
      ]
    },
    {
      slug: "property-management-system",
      title: "Property Management Systems",
      subtitle: "Manage properties and tenants efficiently",
      description: "Property management platforms for landlords and property managers to handle rentals, maintenance, finances, and tenant communications.",
      features: [
        "Property Listings",
        "Tenant Management",
        "Rent Collection",
        "Maintenance Tracking",
        "Financial Reporting",
        "Document Management",
        "Communication Tools",
        "Mobile Access"
      ],
      category: "Service",
      complexity: "Medium",
      estimated_timeline: "12-18 weeks",
      target_audience: "Property managers, landlords, real estate companies",
      key_benefits: [
        "Operational efficiency",
        "Better tenant satisfaction",
        "Financial management",
        "Maintenance optimization"
      ],
      technical_requirements: [
        "Property data management",
        "Tenant communication",
        "Financial integration",
        "Maintenance workflow"
      ],
      success_metrics: [
        "Tenant retention rate",
        "Maintenance response time",
        "Rent collection rate",
        "Operational efficiency"
      ]
    },
    {
      slug: "internal-tool",
      title: "Internal Business Tools",
      subtitle: "Custom tools for internal business processes",
      description: "Custom internal tools and applications that streamline business processes, automate workflows, and improve operational efficiency.",
      features: [
        "Process Automation",
        "Workflow Management",
        "Data Integration",
        "User Dashboards",
        "Reporting Tools",
        "Collaboration Features",
        "Mobile Access",
        "API Integrations"
      ],
      category: "Business",
      complexity: "Medium",
      estimated_timeline: "8-14 weeks",
      target_audience: "Businesses, teams, organizations",
      key_benefits: [
        "Operational efficiency",
        "Cost reduction",
        "Process standardization",
        "Better decision making"
      ],
      technical_requirements: [
        "Business process analysis",
        "Workflow design",
        "Data integration",
        "User interface design"
      ],
      success_metrics: [
        "Process efficiency improvement",
        "Cost savings",
        "User adoption rate",
        "Error reduction"
      ]
    },
    {
      slug: "streaming-service",
      title: "Streaming Service Platforms",
      subtitle: "Deliver video and audio content to audiences",
      description: "Streaming platforms for video and audio content delivery with user management, payment processing, and content protection features.",
      features: [
        "Content Streaming",
        "User Management",
        "Subscription Management",
        "Payment Processing",
        "Content Protection",
        "Analytics Dashboard",
        "Mobile Apps",
        "API Integrations"
      ],
      category: "Media",
      complexity: "High",
      estimated_timeline: "18-26 weeks",
      target_audience: "Media companies, content creators, streaming services",
      key_benefits: [
        "Content monetization",
        "Global audience reach",
        "User engagement",
        "Revenue growth"
      ],
      technical_requirements: [
        "Video streaming infrastructure",
        "Content delivery network",
        "Payment processing",
        "Content protection"
      ],
      success_metrics: [
        "Subscriber growth",
        "Content consumption",
        "Revenue per subscriber",
        "User retention"
      ]
    },
    {
      slug: "job-board",
      title: "Job Board Platforms",
      subtitle: "Connect employers with job seekers",
      description: "Job board platforms that allow employers to post jobs and job seekers to find opportunities with advanced search and matching features.",
      features: [
        "Job Postings",
        "Resume Management",
        "Advanced Search",
        "Application Tracking",
        "Employer Dashboard",
        "Payment Integration",
        "Analytics Dashboard",
        "Mobile Apps"
      ],
      category: "Recruitment",
      complexity: "Medium",
      estimated_timeline: "12-18 weeks",
      target_audience: "Employers, recruitment agencies, job seekers",
      key_benefits: [
        "Faster hiring process",
        "Better candidate quality",
        "Cost-effective recruitment",
        "Improved employer branding"
      ],
      technical_requirements: [
        "Job posting system",
        "Candidate management",
        "Search algorithms",
        "Payment integration"
      ],
      success_metrics: [
        "Time to hire",
        "Quality of hire",
        "Employer satisfaction",
        "Job seeker engagement"
      ]
    },
    {
      slug: "review-and-rating",
      title: "Review & Rating Platforms",
      subtitle: "Collect and manage customer reviews and ratings",
      description: "Review platforms that allow customers to leave feedback, ratings, and reviews with moderation tools and analytics.",
      features: [
        "Review Collection",
        "Rating System",
        "Moderation Tools",
        "Analytics Dashboard",
        "Response Management",
        "Integration APIs",
        "Mobile Access",
        "Reporting Tools"
      ],
      category: "Business",
      complexity: "Low",
      estimated_timeline: "6-10 weeks",
      target_audience: "Businesses, service providers, e-commerce",
      key_benefits: [
        "Customer feedback collection",
        "Reputation management",
        "Trust building",
        "Business improvement"
      ],
      technical_requirements: [
        "Review system setup",
        "Moderation workflow",
        "Analytics integration",
        "Customer communication"
      ],
      success_metrics: [
        "Review collection rate",
        "Average rating improvement",
        "Customer satisfaction",
        "Response rate"
      ]
    },
    {
      slug: "subscription-box-service",
      title: "Subscription Box Services",
      subtitle: "Manage subscription-based product deliveries",
      description: "Subscription box platforms that handle customer subscriptions, inventory management, shipping logistics, and recurring billing.",
      features: [
        "Subscription Management",
        "Inventory Tracking",
        "Shipping Logistics",
        "Recurring Billing",
        "Customer Portal",
        "Box Customization",
        "Analytics Dashboard",
        "Mobile Apps"
      ],
      category: "Commerce",
      complexity: "Medium",
      estimated_timeline: "12-18 weeks",
      target_audience: "Subscription box companies, product curators",
      key_benefits: [
        "Recurring revenue",
        "Customer retention",
        "Operational efficiency",
        "Personalized experiences"
      ],
      technical_requirements: [
        "Subscription management",
        "Inventory system",
        "Shipping integration",
        "Recurring payment setup"
      ],
      success_metrics: [
        "Subscriber retention rate",
        "Revenue per subscriber",
        "Churn rate reduction",
        "Customer satisfaction"
      ]
    },
    {
      slug: "community-forum",
      title: "Community Forum Platforms",
      subtitle: "Build engaged online communities",
      description: "Community platforms with forums, discussions, user profiles, moderation tools, and engagement features to build active communities.",
      features: [
        "Forum Management",
        "User Profiles",
        "Discussion Threads",
        "Moderation Tools",
        "User Engagement",
        "Search Functionality",
        "Mobile Access",
        "Analytics Dashboard"
      ],
      category: "Community",
      complexity: "Medium",
      estimated_timeline: "10-16 weeks",
      target_audience: "Communities, organizations, online groups",
      key_benefits: [
        "Community engagement",
        "User retention",
        "Knowledge sharing",
        "Brand loyalty"
      ],
      technical_requirements: [
        "Forum structure design",
        "User management system",
        "Moderation tools",
        "Engagement features"
      ],
      success_metrics: [
        "User engagement rate",
        "Community growth",
        "Content quality",
        "User retention"
      ]
    },
    {
      slug: "custom-application",
      title: "Custom Applications",
      subtitle: "Tailored solutions for unique business needs",
      description: "Custom-built applications designed specifically for unique business requirements that don't fit standard software solutions.",
      features: [
        "Custom Functionality",
        "Tailored User Experience",
        "Specific Business Logic",
        "Integration Capabilities",
        "Scalable Architecture",
        "Security Features",
        "Performance Optimization",
        "Ongoing Support"
      ],
      category: "Custom",
      complexity: "High",
      estimated_timeline: "16-32 weeks",
      target_audience: "Businesses with unique requirements",
      key_benefits: [
        "Perfect fit for business needs",
        "Competitive advantage",
        "Operational efficiency",
        "Scalability"
      ],
      technical_requirements: [
        "Business requirements analysis",
        "Custom development",
        "Integration planning",
        "Security implementation"
      ],
      success_metrics: [
        "Business process improvement",
        "User adoption rate",
        "ROI achievement",
        "Competitive advantage"
      ]
    },
    {
      slug: "news-website",
      title: "News Website",
      subtitle: "Professional news and media platforms",
      description: "Modern news websites with content management, automated publishing, SEO optimization, and audience engagement features for media companies and publishers.",
      features: [
        "Content Management System",
        "Automated Publishing",
        "SEO Optimization",
        "Audience Analytics",
        "Social Media Integration",
        "Mobile Responsiveness",
        "Comment System",
        "Newsletter Integration"
      ],
      category: "Web & Digital Presence",
      complexity: "Medium",
      estimated_timeline: "8-16 weeks",
      target_audience: "Media companies, publishers, news organizations",
      key_benefits: [
        "Fast content publishing",
        "SEO-optimized reach",
        "Audience engagement",
        "Revenue monetization"
      ],
      success_metrics: [
        "Page views and unique visitors",
        "Time spent on site",
        "Social shares and engagement",
        "Ad revenue and subscriptions"
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

  # Convert display name to slug for form submissions
  def self.display_name_to_slug(display_name)
    # Handle common variations and clean up the display name
    cleaned_name = display_name.to_s.downcase.strip

    # Direct mapping for exact matches
    case cleaned_name
    when "small business branded site"
      "small-business-branded-site"
    when "e-commerce"
      "e-commerce"
    when "food delivery"
      "food-delivery"
    when "equipment hire"
      "equipment-hire"
    when "financial services or banking"
      "financial-services-banking"
    when "gambling or igaming"
      "gambling-or-igaming"
    when "digital marketing agency site"
      "digital-marketing-agency-site"
    when "cryptocurrency exchange"
      "cryptocurrency-exchange"
    when "fitness & wellness"
      "fitness-and-wellness"
    when "service booking"
      "service-booking"
    when "healthcare management system"
      "healthcare-management-system"
    when "telemedicine"
      "telemedicine"
    when "educational"
      "educational"
    when "e-learning"
      "e-learning"
    when "business management software"
      "business-management-software"
    when "customer relationship management"
      "customer-relationship-management"
    when "project management tool"
      "project-management-tool"
    when "ride-sharing"
      "ride-sharing"
    when "logistics & delivery"
      "logistics-and-delivery"
    when "appointment scheduling"
      "appointment-scheduling"
    when "social networking"
      "social-networking"
    when "video gaming"
      "video-gaming"
    when "event management system"
      "event-management-system"
    when "content management system"
      "content-management-system"
    when "inventory management system"
      "inventory-management-system"
    when "learning management system"
      "learning-management-system"
    when "property management system"
      "property-management-system"
    when "internal tool"
      "internal-tool"
    when "streaming service"
      "streaming-service"
    when "job board"
      "job-board"
    when "review & rating"
      "review-and-rating"
    when "subscription box service"
      "subscription-box-service"
    when "community forum"
      "community-forum"
    when "custom application"
      "custom-application"
    else
      # Fallback: convert to slug format
      cleaned_name.gsub(/\s+/, "-").gsub(/[^a-z0-9-]/, "").gsub(/-+/, "-").gsub(/^-|-$/, "")
    end
  end

  # Find use case by display name or slug
  def self.find_by_name_or_slug(name_or_slug)
    # First try to find by slug
    use_case = find_by_slug(name_or_slug)
    return use_case if use_case

    # If not found, try to convert display name to slug and search again
    slug = display_name_to_slug(name_or_slug)
    find_by_slug(slug)
  end
end
