# Stripe Infrastructure for Automated and Scalable Billing System
terraform {
  required_version = ">= 1.8.0"

  required_providers {
    stripe = {
      source  = "lukasaron/stripe"
      version = "~> 3.3.3"
    }
  }
}


provider "stripe" {
  api_key = var.stripe_api_key
}

# A billing portal using all the available options
resource "stripe_portal_configuration" "portal_configuration" {
  business_profile {
    headline             = var.company_name
    privacy_policy_url   = "https://${var.domain}/privacy"
    terms_of_service_url = "https://${var.domain}/terms"
  }
  default_return_url = "https://${var.domain}"
  features {
    customer_update {
      enabled         = true
      allowed_updates = ["email", "address", "shipping", "phone", "tax_id"]
    }
    invoice_history {
      enabled = true
    }
    payment_method_update {
      enabled = true
    }
    subscription_cancel {
      enabled = true
      cancellation_reason {
        enabled = true
        options = ["too_expensive", "missing_features", "switched_service", "unused", "customer_service", "too_complex", "low_quality", "other"]
      }
      mode               = "immediately"
      proration_behavior = "create_prorations"
    }
    subscription_update {
      enabled                 = true
      default_allowed_updates = ["price", "quantity", "promotion_code"]
      proration_behavior      = "always_invoice"
      products {
        product = stripe_product.digital_marketing_package.id
        prices  = [stripe_price.digital_marketing_basic.id, stripe_price.digital_marketing_standard.id, stripe_price.digital_marketing_premium.id, stripe_price.digital_marketing_basic_yearly.id, stripe_price.digital_marketing_standard_yearly.id, stripe_price.digital_marketing_premium_yearly.id]
      }
      products {
        product = stripe_product.managed_devops.id
        prices  = [stripe_price.devops_starter.id, stripe_price.devops_basic.id, stripe_price.devops_standard.id, stripe_price.devops_enterprise.id, stripe_price.devops_basic_yearly.id, stripe_price.devops_standard_yearly.id, stripe_price.devops_enterprise_yearly.id]
      }
      products {
        product = stripe_product.payment_processing.id
        prices  = [stripe_price.payment_processing_basic.id, stripe_price.payment_processing_standard.id, stripe_price.payment_processing_premium.id, stripe_price.payment_processing_basic_yearly.id, stripe_price.payment_processing_standard_yearly.id, stripe_price.payment_processing_premium_yearly.id]
      }
      products {
        product = stripe_product.analytics_tracking.id
        prices  = [stripe_price.analytics_basic.id, stripe_price.analytics_standard.id, stripe_price.analytics_premium.id, stripe_price.analytics_basic_yearly.id, stripe_price.analytics_standard_yearly.id, stripe_price.analytics_premium_yearly.id]
      }
      products {
        product = stripe_product.ai_ml_features.id
        prices  = [stripe_price.ai_ml_basic.id, stripe_price.ai_ml_standard.id, stripe_price.ai_ml_premium.id, stripe_price.ai_ml_basic_yearly.id, stripe_price.ai_ml_standard_yearly.id, stripe_price.ai_ml_premium_yearly.id]
      }
      products {
        product = stripe_product.blockchain_integration.id
        prices  = [stripe_price.blockchain_basic.id, stripe_price.blockchain_standard.id, stripe_price.blockchain_premium.id]
      }
      products {
        product = stripe_product.gambling_igaming.id
        prices  = [stripe_price.gambling_basic.id, stripe_price.gambling_standard.id, stripe_price.gambling_premium.id]
      }
      products {
        product = stripe_product.real_time_features.id
        prices  = [stripe_price.real_time_basic.id, stripe_price.real_time_standard.id, stripe_price.real_time_premium.id]
      }
      products {
        product = stripe_product.automated_digital_marketing.id
        prices  = [stripe_price.marketing_basic.id, stripe_price.marketing_standard.id, stripe_price.marketing_premium.id]
      }
      products {
        product = stripe_product.autoblogger.id
        prices  = [stripe_price.autoblogger_basic.id, stripe_price.autoblogger_standard.id, stripe_price.autoblogger_premium.id]
      }
      products {
        product = stripe_product.publisher.id
        prices  = [stripe_price.publisher_basic.id, stripe_price.publisher_standard.id, stripe_price.publisher_premium.id]
      }
      products {
        product = stripe_product.customer_support_chatbot.id
        prices  = [stripe_price.support_chatbot_basic.id, stripe_price.support_chatbot_standard.id, stripe_price.support_chatbot_premium.id]
      }
      products {
        product = stripe_product.sales_chatbot.id
        prices  = [stripe_price.sales_chatbot_basic.id, stripe_price.sales_chatbot_standard.id, stripe_price.sales_chatbot_premium.id]
      }
      products {
        product = stripe_product.crm_system.id
        prices  = [stripe_price.crm_basic.id, stripe_price.crm_standard.id, stripe_price.crm_premium.id]
      }
      products {
        product = stripe_product.general_maintenance_retainer.id
        prices  = [stripe_price.maintenance_retainer_basic.id, stripe_price.maintenance_retainer_standard.id, stripe_price.maintenance_retainer_premium.id]
      }
      products {
        product = stripe_product.api_development.id
        prices  = [stripe_price.api_basic.id, stripe_price.api_standard.id, stripe_price.api_premium.id]
      }
      products {
        product = stripe_product.app_store_management.id
        prices  = [stripe_price.app_store_basic.id, stripe_price.app_store_standard.id, stripe_price.app_store_premium.id]
      }
      products {
        product = stripe_product.blog_cms.id
        prices  = [stripe_price.blog_cms_basic.id, stripe_price.blog_cms_standard.id, stripe_price.blog_cms_premium.id]
      }
      products {
        product = stripe_product.internationalization.id
        prices  = [stripe_price.i18n_basic.id, stripe_price.i18n_standard.id, stripe_price.i18n_premium.id]
      }
      products {
        product = stripe_product.sso_social_login.id
        prices  = [stripe_price.sso_basic.id, stripe_price.sso_standard.id, stripe_price.sso_premium.id]
      }
    }
  }
  metadata = {
    company_name     = var.company_name
    domain           = var.domain
    portal_version   = "1.0"
    created_by       = "terraform"
    environment      = "production"
    features_enabled = "customer_update,invoice_history,payment_method_update,subscription_cancel,subscription_update,subscription_pause"
    support_email    = "support@${var.domain}"
    last_updated     = "2025-09-07"
  }
}

resource "stripe_product" "digital_marketing_package" {
  name        = "Digital Marketing Package"
  description = "Dominate your market with our comprehensive digital marketing ecosystem. From SEO optimization and content marketing to social media management and paid advertising, we create data-driven strategies that drive qualified traffic, boost conversions, and maximize ROI. Our team of marketing experts and data analysts work together to create campaigns that not only reach your audience but convert them into loyal customers."
  active      = true

  metadata = {
    category            = "marketing"
    type                = "productized"
    phase               = "productization"
    target_audience     = "B2B,B2C,E-commerce,SaaS"
    channels_included   = "SEO,SEM,Social media,Content marketing,Email marketing"
    reporting_frequency = "Weekly performance reports"
    tools_included      = "Google Analytics,SEMrush,Hootsuite,HubSpot"
    success_metrics     = "Traffic growth,Conversion rate,ROI,Customer acquisition cost"
  }
}

# =============================================================================
# PHASE 2: PRODUCTIZATION - MRR AND TIERS
# =============================================================================

# Productized Services with Tiers
resource "stripe_product" "managed_devops" {
  name        = "Managed DevOps Services"
  description = "Accelerate your development velocity and ensure rock-solid reliability with our enterprise-grade DevOps solutions. From CI/CD pipeline optimization and infrastructure automation to 24/7 monitoring and incident response, we handle the complexity so you can focus on building great products. Our DevOps engineers bring years of experience managing high-traffic applications and implementing best practices that scale."
  active      = true

  metadata = {
    category          = "devops"
    type              = "productized"
    phase             = "productization"
    target_businesses = "SaaS companies,E-commerce platforms,FinTech apps,High-growth startups"
    technologies      = "Docker,Kubernetes,AWS,Hetzner"
    monitoring_tools  = "Prometheus,Grafana,OpenTelemetry,ArgoCD"
    security_features = "Vulnerability scanning,Compliance monitoring,Access control,Security audits"
    uptime_sla        = "99.9% guaranteed"
    response_time     = "< 15 minutes for critical alerts"
    support_channels  = "24/7 phone,Email,Discord,Dedicated dashboard"
    business_value    = "Reduce deployment time by 80%,Improve uptime reliability,Automate infrastructure costs,Enable rapid scaling"
    typical_clients   = "Series A+ startups,Growing SaaS companies,Enterprise IT teams"
  }
}

# Tiered Pricing for Digital Marketing
resource "stripe_price" "digital_marketing_basic" {
  currency       = "usd"
  product        = stripe_product.digital_marketing_package.id
  unit_amount    = 250000 # $2,500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                   = "basic"
    target_business_size   = "Small business,Startups"
    monthly_traffic_target = "5k-25k visitors"
    features_included      = "On-page SEO optimization,4 blog posts/month,Social media management (3 platforms),Monthly performance report,Basic keyword research"
    support_level          = "Email support,Monthly strategy call"
    setup_time             = "2 weeks"
    contract_term          = "3 months minimum"
    phase                  = "productization"
  }
}

resource "stripe_price" "digital_marketing_standard" {
  currency       = "usd"
  product        = stripe_product.digital_marketing_package.id
  unit_amount    = 500000 # $5,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                   = "standard"
    target_business_size   = "Growing businesses,Mid-market companies"
    monthly_traffic_target = "25k-100k visitors"
    features_included      = "Advanced SEO with technical audits,8 blog posts/month,Comprehensive social media (6 platforms),Email marketing campaigns,Cloudflare Ads management,Advanced analytics dashboard,Competitor analysis"
    support_level          = "Priority email,Weekly strategy calls,Dedicated account manager"
    setup_time             = "1 week"
    contract_term          = "3 months minimum"
    phase                  = "productization"
  }
}

resource "stripe_price" "digital_marketing_premium" {
  currency       = "usd"
  product        = stripe_product.digital_marketing_package.id
  unit_amount    = 1000000 # $10,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                   = "premium"
    target_business_size   = "Enterprise,High-growth companies"
    monthly_traffic_target = "100k+ visitors"
    features_included      = "Enterprise SEO with international targeting,16 premium blog posts/month,Full social media management (10+ platforms),Advanced email automation,PPC campaign management (Cloudflare,Facebook,LinkedIn),Custom analytics dashboards,Conversion rate optimization,Brand monitoring,Influencer partnerships"
    support_level          = "24/7 phone support,Daily strategy calls,Dedicated marketing team,Monthly executive reports"
    setup_time             = "3-5 days"
    contract_term          = "6 months minimum"
    phase                  = "productization"
  }
}

# Annual Pricing for Digital Marketing (20% discount)
resource "stripe_price" "digital_marketing_basic_yearly" {
  currency       = "usd"
  product        = stripe_product.digital_marketing_package.id
  unit_amount    = 2400000 # $24,000.00 per year ($2,000/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                   = "basic_yearly"
    billing_cycle          = "annual"
    discount_percentage    = "20"
    monthly_equivalent     = "$2,000"
    target_business_size   = "Small business,Startups"
    monthly_traffic_target = "5k-25k visitors"
    features_included      = "On-page SEO optimization,4 blog posts/month,Social media management (3 platforms),Monthly performance report,Basic keyword research"
    support_level          = "Email support,Monthly strategy call"
    setup_time             = "2 weeks"
    contract_term          = "Annual commitment"
    savings                = "$6,000 vs monthly"
    phase                  = "productization"
  }
}

resource "stripe_price" "digital_marketing_standard_yearly" {
  currency       = "usd"
  product        = stripe_product.digital_marketing_package.id
  unit_amount    = 4800000 # $48,000.00 per year ($4,000/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                   = "standard_yearly"
    billing_cycle          = "annual"
    discount_percentage    = "20"
    monthly_equivalent     = "$4,000"
    target_business_size   = "Growing businesses,Mid-market companies"
    monthly_traffic_target = "25k-100k visitors"
    features_included      = "Advanced SEO with technical audits,8 blog posts/month,Comprehensive social media (6 platforms),Email marketing campaigns,Cloudflare Ads management,Advanced analytics dashboard,Competitor analysis"
    support_level          = "Priority email,Weekly strategy calls,Dedicated account manager"
    setup_time             = "1 week"
    contract_term          = "Annual commitment"
    savings                = "$12,000 vs monthly"
    phase                  = "productization"
  }
}

resource "stripe_price" "digital_marketing_premium_yearly" {
  currency       = "usd"
  product        = stripe_product.digital_marketing_package.id
  unit_amount    = 9600000 # $96,000.00 per year ($8,000/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                   = "premium_yearly"
    billing_cycle          = "annual"
    discount_percentage    = "20"
    monthly_equivalent     = "$8,000"
    target_business_size   = "Enterprise,High-growth companies"
    monthly_traffic_target = "100k+ visitors"
    features_included      = "Enterprise SEO with international targeting,16 premium blog posts/month,Full social media management (10+ platforms),Advanced email automation,PPC campaign management (Google,Facebook,LinkedIn),Custom analytics dashboards,Conversion rate optimization,Brand monitoring,Influencer partnerships"
    support_level          = "24/7 phone support,Daily strategy calls,Dedicated marketing team,Monthly executive reports"
    setup_time             = "3-5 days"
    contract_term          = "Annual commitment"
    savings                = "$24,000 vs monthly"
    phase                  = "productization"
  }
}



resource "stripe_price" "devops_starter" {
  currency       = "usd"
  product        = stripe_product.managed_devops.id
  unit_amount    = 7500 # $75.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                    = "starter"
    target_businesses       = "PaaS clients,Small applications,Prototypes,MVPs,Personal projects"
    features_included       = "24/7 uptime monitoring,Automatic restarts,Basic error alerts,Email support only,Basic security patches"
    infrastructure_included = "Shared hosting environment,Basic auto-scaling (up to 3 instances),Standard backup (weekly)"
    response_time           = "< 48 hours"
    uptime_sla              = "99.0%"
    support_level           = "Discord, Email support only"
    included_tools          = "Basic uptime monitoring,Simple deployment dashboard"
    business_value          = "Guaranteed uptime,Hands-off hosting,No server management worries"
    scaling_note            = "For higher resource usage or custom requirements, upgrade to Standard tier required"
    max_resource_usage      = "Low resource usage tier"
    phase                   = "productization"
  }
}

# Tiered Pricing for DevOps
resource "stripe_price" "devops_basic" {
  currency       = "usd"
  product        = stripe_product.managed_devops.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                    = "basic"
    target_businesses       = "Early-stage startups,Small SaaS companies,Landing page businesses"
    features_included       = "Basic CI/CD pipeline,GitHub Actions setup,Basic monitoring (uptime),20 hours support/month,Security updates,Daily backups,Basic performance monitoring"
    infrastructure_included = "2 environments (dev, prod),Basic AWS setup,Shared infrastructure"
    response_time           = "< 24 hours"
    uptime_sla              = "99.5%"
    support_level           = "Email support,Monthly review calls"
    included_tools          = "GitHub Actions,Docker,Basic monitoring dashboard"
    business_value          = "Reduce deployment time by 60%,Basic reliability monitoring,Automated backups"
    max_resource_usage      = "Medium resource usage tier"
    phase                   = "productization"
  }
}

resource "stripe_price" "devops_standard" {
  currency       = "usd"
  product        = stripe_product.managed_devops.id
  unit_amount    = 600000 # $6,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                    = "standard"
    target_businesses       = "Growing SaaS companies,E-commerce platforms,Series A startups"
    features_included       = "Advanced CI/CD with automated testing,Comprehensive monitoring (performance + errors),40 hours support/month,Automated security scanning,Load balancing,Database optimization,Multi-environment setup,Performance optimization"
    infrastructure_included = "4 environments (dev/staging/qa/prod),AWS/GCP with auto-scaling,Dedicated infrastructure"
    response_time           = "< 4 hours"
    uptime_sla              = "99.9%"
    support_level           = "Priority email,Weekly strategy calls,Dedicated DevOps engineer"
    included_tools          = "GitHub CI,Kubernetes,Docker,Prometheus metrics,Private Grafana dashboard url"
    business_value          = "Reduce deployment time by 75%,Enterprise-grade monitoring,Automated scaling,Performance optimization"
    max_resource_usage      = "High resource usage tier"
    phase                   = "productization"
  }
}

resource "stripe_price" "devops_enterprise" {
  currency       = "usd"
  product        = stripe_product.managed_devops.id
  unit_amount    = 1200000 # $12,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                    = "enterprise"
    target_businesses       = "Enterprise companies,High-traffic platforms,Financial institutions,Mission-critical systems"
    features_included       = "Enterprise CI/CD with advanced testing,24/7 monitoring & alerting,Unlimited support hours,Advanced security (penetration testing),Multi-region deployment,Disaster recovery,Performance optimization,Custom integrations,Compliance automation"
    infrastructure_included = "4 environments (dev/staging/qa/prod),Kubernetes orchestration,Multi-cloud setup,Dedicated infrastructure,Custom SLAs"
    response_time           = "< 15 minutes critical issues"
    uptime_sla              = "99.99%"
    support_level           = "24/7 phone support,Dedicated DevOps team,On-site support available"
    included_tools          = "GitHub CI,Kubernetes,Docker,Prometheus metrics, Private Grafana dashboard url"
    business_value          = "Reduce deployment time by 90%,Mission-critical reliability,Multi-region redundancy,Enterprise compliance"
    max_resource_usage      = "Massive resource usage tier"
    phase                   = "productization"
  }
}

# Annual Pricing for DevOps (20% discount)
resource "stripe_price" "devops_basic_yearly" {
  currency       = "usd"
  product        = stripe_product.managed_devops.id
  unit_amount    = 960000 # $9,600.00 per year ($800/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                    = "basic_yearly"
    billing_cycle           = "annual"
    discount_percentage     = "20"
    monthly_equivalent      = "$800"
    target_businesses       = "Early-stage startups,Small SaaS companies,Landing page businesses"
    features_included       = "Basic CI/CD pipeline,GitHub Actions setup,Basic monitoring (uptime),20 hours support/month,Security updates,Daily backups,Basic performance monitoring"
    infrastructure_included = "2 environments (dev, prod),Basic AWS setup,Shared infrastructure"
    response_time           = "< 24 hours"
    uptime_sla              = "99.5%"
    support_level           = "Email support,Monthly review calls"
    included_tools          = "GitHub Actions,Docker,Basic monitoring dashboard"
    business_value          = "Reduce deployment time by 60%,Basic reliability monitoring,Automated backups"
    max_resource_usage      = "Medium resource usage tier"
    savings                 = "$2,400 vs monthly"
    phase                   = "productization"
  }
}

resource "stripe_price" "devops_standard_yearly" {
  currency       = "usd"
  product        = stripe_product.managed_devops.id
  unit_amount    = 5760000 # $57,600.00 per year ($4,800/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                    = "standard_yearly"
    billing_cycle           = "annual"
    discount_percentage     = "20"
    monthly_equivalent      = "$4,800"
    target_businesses       = "Growing SaaS companies,E-commerce platforms,Series A startups"
    features_included       = "Advanced CI/CD with automated testing,Comprehensive monitoring (performance + errors),40 hours support/month,Automated security scanning,Load balancing,Database optimization,Multi-environment setup,Performance optimization"
    infrastructure_included = "4 environments (dev/staging/qa/prod),AWS/GCP with auto-scaling,Dedicated infrastructure"
    response_time           = "< 4 hours"
    uptime_sla              = "99.9%"
    support_level           = "Priority email,Weekly strategy calls,Dedicated DevOps engineer"
    included_tools          = "GitHub CI,Kubernetes,Docker,Prometheus metrics,Private Grafana dashboard url"
    business_value          = "Reduce deployment time by 75%,Enterprise-grade monitoring,Automated scaling,Performance optimization"
    max_resource_usage      = "High resource usage tier"
    savings                 = "$14,400 vs monthly"
    phase                   = "productization"
  }
}

resource "stripe_price" "devops_enterprise_yearly" {
  currency       = "usd"
  product        = stripe_product.managed_devops.id
  unit_amount    = 11520000 # $115,200.00 per year ($9,600/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                    = "enterprise_yearly"
    billing_cycle           = "annual"
    discount_percentage     = "20"
    monthly_equivalent      = "$9,600"
    target_businesses       = "Enterprise companies,High-traffic platforms,Financial institutions,Mission-critical systems"
    features_included       = "Enterprise CI/CD with advanced testing,24/7 monitoring & alerting,Unlimited support hours,Advanced security (penetration testing),Multi-region deployment,Disaster recovery,Performance optimization,Custom integrations,Compliance automation"
    infrastructure_included = "4 environments (dev/staging/qa/prod),Kubernetes orchestration,Multi-cloud setup,Dedicated infrastructure,Custom SLAs"
    response_time           = "< 15 minutes critical issues"
    uptime_sla              = "99.99%"
    support_level           = "24/7 phone support,Dedicated DevOps team,On-site support available"
    included_tools          = "GitHub CI,Kubernetes,Docker,Prometheus metrics, Private Grafana dashboard url"
    business_value          = "Reduce deployment time by 90%,Mission-critical reliability,Multi-region redundancy,Enterprise compliance"
    max_resource_usage      = "Massive resource usage tier"
    savings                 = "$28,800 vs monthly"
    phase                   = "productization"
  }
}

# =============================================================================
# MRR SERVICES - HIGH AND MEDIUM PRIORITY FEATURES
# =============================================================================

# 1. Payment Processing
resource "stripe_product" "payment_processing" {
  name        = "Payment Processing Management"
  description = "Enterprise-grade payment infrastructure that ensures secure, compliant, and seamless transactions for your business. Our comprehensive payment processing service handles everything from PCI DSS compliance and fraud prevention to multi-gateway integration and real-time transaction monitoring. Never worry about payment security, chargebacks, or regulatory compliance again - we manage it all while you focus on growing your business."
  active      = true

  metadata = {
    category             = "payment"
    type                 = "mrr_service"
    priority             = "high"
    ongoing_requirements = "PCI DSS compliance monitoring,Security updates,Payment gateway maintenance,Fraud detection,Transaction monitoring,Chargeback management"
    mrr_justification    = "2-5% of transaction volume or fixed monthly fee ($500-$2,000) for compliance and security monitoring"
    target_businesses    = "E-commerce,SaaS,Marketplaces,Subscription services"
    compliance_standards = "PCI DSS Level 1,GDPR,HIPAA,SOC 2"
    supported_gateways   = "Stripe,PayPal,Braintree,Adyen,Authorize.net"
    security_features    = "Real-time fraud detection,3D Secure,Tokenization,Encryption"
    monitoring_included  = "24/7 transaction monitoring,Automated alerts,Monthly compliance reports"
    phase                = "mrr"
  }
}

# resource "stripe_price" "payment_processing_free" {
#   currency    = "usd"
#   product     = stripe_product.payment_processing.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Low-volume merchants"
#     features_included = "Self-managed Stripe integration,Stripe PCI compliance"
#     limitations       = "No dedicated support,No custom integrations,Limited reporting"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     upgrade_path      = "Basic tier recommended for growing businesses"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "payment_processing_basic" {
  currency       = "usd"
  product        = stripe_product.payment_processing.id
  unit_amount    = 50000 # $500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                  = "basic"
    target_businesses     = "Growing e-commerce,SaaS companies,Small marketplaces"
    monthly_transactions  = "1,000 - 10,000"
    features_included     = "Monthly PCI compliance monitoring,Automated security updates,Fraud detection alerts,Basic transaction reporting,Email support"
    response_time         = "< 24 hours"
    included_integrations = "Stripe,PayPal"
    monitoring_features   = "Basic fraud alerts,Monthly compliance reports"
    phase                 = "mrr"
  }
}

resource "stripe_price" "payment_processing_standard" {
  currency       = "usd"
  product        = stripe_product.payment_processing.id
  unit_amount    = 125000 # $1,250.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                  = "standard"
    target_businesses     = "Mid-market companies,High-volume e-commerce,Subscription services"
    monthly_transactions  = "10,000 - 100,000"
    features_included     = "Weekly PCI compliance monitoring,Advanced fraud detection,Real-time transaction monitoring,Custom reporting dashboard,Priority support,Multi-gateway integration"
    response_time         = "< 4 hours"
    included_integrations = "Stripe,PayPal,Braintree,Adyen"
    monitoring_features   = "Real-time fraud alerts,Daily transaction reports,Chargeback management"
    phase                 = "mrr"
  }
}

resource "stripe_price" "payment_processing_premium" {
  currency       = "usd"
  product        = stripe_product.payment_processing.id
  unit_amount    = 200000 # $2,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                  = "premium"
    target_businesses     = "Enterprise companies,High-risk industries,Large marketplaces"
    monthly_transactions  = "100,000+"
    features_included     = "24/7 PCI compliance monitoring,Enterprise fraud prevention,Advanced analytics dashboard,Dedicated account manager,Phone support,Custom integrations,Regulatory compliance assistance"
    response_time         = "< 1 hour"
    included_integrations = "All major gateways,Custom payment solutions"
    monitoring_features   = "24/7 monitoring,Real-time alerts,Executive reporting,Custom analytics"
    phase                 = "mrr"
  }
}

# resource "stripe_price" "payment_processing_custom" {
#   currency       = "usd"
#   product        = stripe_product.payment_processing.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier               = "custom"
#     target_businesses  = "Enterprise,High-volume,Specialized industries"
#     pricing_model      = "Volume-based or custom agreement"
#     features_included  = "Everything in Premium plus: Custom SLAs, Dedicated team, White-label solutions, API customization"
#     minimum_commitment = "12 months"
#     custom_features    = "Available upon consultation"
#     phase              = "mrr"
#   }
# }

# Annual Pricing for Payment Processing (20% discount)
resource "stripe_price" "payment_processing_basic_yearly" {
  currency       = "usd"
  product        = stripe_product.payment_processing.id
  unit_amount    = 480000 # $4,800.00 per year ($400/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                  = "basic_yearly"
    billing_cycle         = "annual"
    discount_percentage   = "20"
    monthly_equivalent    = "$400"
    target_businesses     = "Growing e-commerce,SaaS companies,Small marketplaces"
    monthly_transactions  = "1,000 - 10,000"
    features_included     = "Monthly PCI compliance monitoring,Automated security updates,Fraud detection alerts,Basic transaction reporting,Email support"
    response_time         = "< 24 hours"
    included_integrations = "Stripe,PayPal"
    monitoring_features   = "Basic fraud alerts,Monthly compliance reports"
    savings               = "$1,200 vs monthly"
    phase                 = "mrr"
  }
}

resource "stripe_price" "payment_processing_standard_yearly" {
  currency       = "usd"
  product        = stripe_product.payment_processing.id
  unit_amount    = 3000000 # $30,000.00 per year ($2,500/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                  = "standard_yearly"
    billing_cycle         = "annual"
    discount_percentage   = "20"
    monthly_equivalent    = "$2,500"
    target_businesses     = "Mid-market companies,High-volume e-commerce,Subscription services"
    monthly_transactions  = "10,000 - 100,000"
    features_included     = "Weekly PCI compliance monitoring,Advanced fraud detection,Real-time transaction monitoring,Custom reporting dashboard,Priority support,Multi-gateway integration"
    response_time         = "< 4 hours"
    included_integrations = "Stripe,PayPal,Braintree,Adyen"
    monitoring_features   = "Real-time fraud alerts,Daily transaction reports,Chargeback management"
    savings               = "$3,000 vs monthly"
    phase                 = "mrr"
  }
}

resource "stripe_price" "payment_processing_premium_yearly" {
  currency       = "usd"
  product        = stripe_product.payment_processing.id
  unit_amount    = 19200000 # $192,000.00 per year ($16,000/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                  = "premium_yearly"
    billing_cycle         = "annual"
    discount_percentage   = "20"
    monthly_equivalent    = "$16,000"
    target_businesses     = "Enterprise companies,High-risk industries,Large marketplaces"
    monthly_transactions  = "100,000+"
    features_included     = "24/7 PCI compliance monitoring,Enterprise fraud prevention,Advanced analytics dashboard,Dedicated account manager,Phone support,Custom integrations,Regulatory compliance assistance"
    response_time         = "< 1 hour"
    included_integrations = "All major gateways,Custom payment solutions"
    monitoring_features   = "24/7 monitoring,Real-time alerts,Executive reporting,Custom analytics"
    savings               = "$48,000 vs monthly"
    phase                 = "mrr"
  }
}

# 2. Analytics Tracking/Dashboard
resource "stripe_product" "analytics_tracking" {
  name        = "Analytics Tracking & Dashboard Management"
  description = "Transform your data into actionable business intelligence with our comprehensive analytics infrastructure. From real-time event tracking and custom dashboard creation to performance monitoring and automated reporting, we ensure your analytics stack delivers accurate, timely insights that drive data-informed decisions. Our experts handle everything from data pipeline optimization and schema updates to visualization enhancements and user behavior analysis."
  active      = true

  metadata = {
    category             = "analytics"
    type                 = "mrr_service"
    priority             = "high"
    ongoing_requirements = "Data pipeline monitoring,Dashboard updates,Performance optimization,Data integrity checks,Custom reporting,Schema evolution,API maintenance"
    mrr_justification    = "Fixed monthly fee ($300-$1,000) for data monitoring and dashboard maintenance"
    target_businesses    = "SaaS companies,E-commerce,Content platforms,Subscription services"
    analytics_tools      = "Google Analytics,Amplitude,Mixpanel,Segment,Custom dashboards"
    data_sources         = "Web analytics,User behavior,Conversion funnels,Revenue tracking"
    reporting_frequency  = "Real-time dashboards,Daily alerts,Weekly reports,Monthly insights"
    data_retention       = "Customizable retention policies,Data archiving,Compliance management"
    phase                = "mrr"
  }
}

# resource "stripe_price" "analytics_free" {
#   currency    = "usd"
#   product     = stripe_product.analytics_tracking.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small SaaS,Content sites,E-commerce stores"
#     monthly_pageviews = "Up to 100k"
#     features_included = "Self-managed analytics setup, basic Google Analytics integration"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No custom dashboards,Limited reporting"
#     upgrade_path      = "Basic tier recommended for growing businesses"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "analytics_basic" {
  currency       = "usd"
  product        = stripe_product.analytics_tracking.id
  unit_amount    = 30000 # $300.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier              = "basic"
    target_businesses = "Small SaaS,Content sites,E-commerce stores"
    monthly_pageviews = "Up to 100k"
    features_included = "Monthly data pipeline health checks,Basic dashboard maintenance,Performance monitoring alerts,Standard reporting templates"
    response_time     = "< 48 hours"
    included_tools    = "Google Analytics,Basic custom dashboards"
    support_level     = "Email support,Monthly review calls"
    phase             = "mrr"
  }
}

resource "stripe_price" "analytics_standard" {
  currency       = "usd"
  product        = stripe_product.analytics_tracking.id
  unit_amount    = 65000 # $650.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier              = "standard"
    target_businesses = "Growing SaaS,E-commerce platforms,Content publishers"
    monthly_pageviews = "Up to 500k"
    features_included = "Weekly data pipeline monitoring,Advanced dashboard customization,Performance optimization,Custom reports,Conversion funnel analysis,User behavior insights"
    response_time     = "< 24 hours"
    included_tools    = "Google Analytics,Amplitude,Mixpanel,Custom dashboards,Automated reports"
    support_level     = "Priority email,Weekly strategy calls,Dedicated analytics engineer"
    data_retention    = "12 months historical data,Real-time processing"
    business_value    = "Improve conversion rates by 25%,Data-driven insights,Automated reporting"
    phase             = "mrr"
  }
}

resource "stripe_price" "analytics_premium" {
  currency       = "usd"
  product        = stripe_product.analytics_tracking.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier              = "premium"
    target_businesses = "Enterprise SaaS,High-traffic platforms,Data-intensive businesses"
    monthly_pageviews = "Up to 2M+"
    features_included = "Daily data integrity monitoring,Real-time dashboard updates,Advanced analytics,Predictive insights,Custom data pipelines,Multi-touch attribution,Revenue optimization,24/7 support"
    response_time     = "< 4 hours"
    included_tools    = "Google Analytics 4,Amplitude,Mixpanel,Segment,Custom BI dashboards,Data warehouse integration"
    support_level     = "24/7 phone support,Daily strategy calls,Dedicated analytics team"
    data_retention    = "Unlimited historical data,Real-time processing,Advanced segmentation"
    business_value    = "Improve conversion rates by 40%,Predictive analytics,Revenue optimization,Enterprise insights"
    phase             = "mrr"
  }
}

# resource "stripe_price" "analytics_custom" {
#   currency       = "usd"
#   product        = stripe_product.analytics_tracking.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on data volume and specific analytics requirements"
#     phase    = "mrr"
#   }
# }

# Annual Pricing for Analytics (20% discount)
resource "stripe_price" "analytics_basic_yearly" {
  currency       = "usd"
  product        = stripe_product.analytics_tracking.id
  unit_amount    = 360000 # $3,600.00 per year ($300/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                = "basic_yearly"
    billing_cycle       = "annual"
    discount_percentage = "20"
    monthly_equivalent  = "$300"
    target_businesses   = "Small SaaS,Content sites,E-commerce stores"
    monthly_pageviews   = "Up to 100k"
    features_included   = "Monthly data pipeline health checks,Basic dashboard maintenance,Performance monitoring alerts,Standard reporting templates"
    response_time       = "< 48 hours"
    included_tools      = "Google Analytics,Basic custom dashboards"
    support_level       = "Email support,Monthly review calls"
    savings             = "$720 vs monthly"
    phase               = "mrr"
  }
}

resource "stripe_price" "analytics_standard_yearly" {
  currency       = "usd"
  product        = stripe_product.analytics_tracking.id
  unit_amount    = 780000 # $7,800.00 per year ($650/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                = "standard_yearly"
    billing_cycle       = "annual"
    discount_percentage = "20"
    monthly_equivalent  = "$650"
    target_businesses   = "Growing SaaS,E-commerce platforms,Subscription services"
    monthly_pageviews   = "100k-500k"
    features_included   = "Weekly data pipeline monitoring,Advanced dashboard maintenance,Real-time alerts,Custom reporting,Performance optimization"
    response_time       = "< 24 hours"
    included_tools      = "Google Analytics,Amplitude,Custom dashboards,Basic data warehouse"
    support_level       = "Priority email,Weekly strategy calls,Dedicated account manager"
    savings             = "$1,560 vs monthly"
    phase               = "mrr"
  }
}

resource "stripe_price" "analytics_premium_yearly" {
  currency       = "usd"
  product        = stripe_product.analytics_tracking.id
  unit_amount    = 9600000 # $96,000.00 per year ($8,000/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                = "premium_yearly"
    billing_cycle       = "annual"
    discount_percentage = "20"
    monthly_equivalent  = "$8,000"
    target_businesses   = "Enterprise SaaS,High-traffic platforms,Data-intensive businesses"
    monthly_pageviews   = "Up to 2M+"
    features_included   = "Daily data integrity monitoring,Real-time dashboard updates,Advanced analytics,Predictive insights,Custom data pipelines,Multi-touch attribution,Revenue optimization,24/7 support"
    response_time       = "< 4 hours"
    included_tools      = "Google Analytics 4,Amplitude,Mixpanel,Segment,Custom BI dashboards,Data warehouse integration"
    support_level       = "24/7 phone support,Daily strategy calls,Dedicated analytics team"
    data_retention      = "Unlimited historical data,Real-time processing,Advanced segmentation"
    business_value      = "Improve conversion rates by 40%,Predictive analytics,Revenue optimization,Enterprise insights"
    savings             = "$24,000 vs monthly"
    phase               = "mrr"
  }
}

# 3. AI/ML Features
resource "stripe_product" "ai_ml_features" {
  name        = "AI/ML Features Management"
  description = "Comprehensive AI/ML management with model retraining, performance monitoring, API updates, and algorithm optimization"
  active      = true

  metadata = {
    category             = "ai_ml"
    type                 = "mrr_service"
    ongoing_requirements = "Model retraining, performance monitoring, API updates, data quality assurance, algorithm optimization"
    mrr_justification    = "Fixed monthly fee ($1,000-$5,000) based on model complexity and data volume"
    phase                = "mrr"
  }
}

# resource "stripe_price" "ai_ml_free" {
#   currency    = "usd"
#   product     = stripe_product.ai_ml_features.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic AI needs"
#     features_included = "Self-managed AI/ML setup,Basic model integration"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No model retraining,No performance monitoring"
#     upgrade_path      = "Basic tier recommended for production AI/ML needs"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "ai_ml_basic" {
  currency       = "usd"
  product        = stripe_product.ai_ml_features.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly model performance monitoring, basic retraining, API maintenance"
    phase    = "mrr"
  }
}

resource "stripe_price" "ai_ml_standard" {
  currency       = "usd"
  product        = stripe_product.ai_ml_features.id
  unit_amount    = 250000 # $2,500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly model updates, advanced performance monitoring, data quality assurance, algorithm optimization"
    phase    = "mrr"
  }
}

resource "stripe_price" "ai_ml_premium" {
  currency       = "usd"
  product        = stripe_product.ai_ml_features.id
  unit_amount    = 500000 # $5,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily model monitoring, continuous retraining, advanced optimization, predictive maintenance, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "ai_ml_custom" {
#   currency       = "usd"
#   product        = stripe_product.ai_ml_features.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on model complexity, data volume, and specific AI/ML requirements"
#     phase    = "mrr"
#   }
# }

# Annual Pricing for AI/ML (20% discount)
resource "stripe_price" "ai_ml_basic_yearly" {
  currency       = "usd"
  product        = stripe_product.ai_ml_features.id
  unit_amount    = 1200000 # $12,000.00 per year ($1,000/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                = "basic_yearly"
    billing_cycle       = "annual"
    discount_percentage = "20"
    monthly_equivalent  = "$1,000"
    features            = "Monthly model monitoring, quarterly retraining, basic optimization, email support"
    savings             = "$2,400 vs monthly"
    phase               = "mrr"
  }
}

resource "stripe_price" "ai_ml_standard_yearly" {
  currency       = "usd"
  product        = stripe_product.ai_ml_features.id
  unit_amount    = 3000000 # $30,000.00 per year ($2,500/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                = "standard_yearly"
    billing_cycle       = "annual"
    discount_percentage = "20"
    monthly_equivalent  = "$2,500"
    features            = "Weekly model monitoring, monthly retraining, advanced optimization, performance tuning, priority support"
    savings             = "$6,000 vs monthly"
    phase               = "mrr"
  }
}

resource "stripe_price" "ai_ml_premium_yearly" {
  currency       = "usd"
  product        = stripe_product.ai_ml_features.id
  unit_amount    = 48000000 # $480,000.00 per year ($40,000/month equivalent)
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "year"
    interval_count = 1
  }

  metadata = {
    tier                = "premium_yearly"
    billing_cycle       = "annual"
    discount_percentage = "20"
    monthly_equivalent  = "$40,000"
    features            = "Daily model monitoring, continuous retraining, advanced optimization, predictive maintenance, 24/7 support"
    savings             = "$120,000 vs monthly"
    phase               = "mrr"
  }
}

# 4. Blockchain Integration
resource "stripe_product" "blockchain_integration" {
  name        = "Blockchain Integration Management"
  description = "Full blockchain infrastructure management with network monitoring, protocol updates, security audits, and smart contract maintenance"
  active      = true

  metadata = {
    category             = "blockchain"
    type                 = "mrr_service"
    ongoing_requirements = "Network monitoring, protocol updates, security audits, transaction monitoring, smart contract maintenance"
    mrr_justification    = "Fixed monthly fee ($800-$3,000) for blockchain infrastructure monitoring"
    phase                = "mrr"
  }
}

# resource "stripe_price" "blockchain_free" {
#   currency    = "usd"
#   product     = stripe_product.blockchain_integration.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic blockchain needs"
#     features_included = "Self-managed blockchain integration,Basic smart contract deployment"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No network monitoring,No security audits"
#     upgrade_path      = "Basic tier recommended for production blockchain needs"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "blockchain_basic" {
  currency       = "usd"
  product        = stripe_product.blockchain_integration.id
  unit_amount    = 80000 # $800.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly network monitoring, basic security audits, smart contract updates"
    phase    = "mrr"
  }
}

resource "stripe_price" "blockchain_standard" {
  currency       = "usd"
  product        = stripe_product.blockchain_integration.id
  unit_amount    = 180000 # $1,800.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly network monitoring, advanced security audits, protocol updates, transaction monitoring"
    phase    = "mrr"
  }
}

resource "stripe_price" "blockchain_premium" {
  currency       = "usd"
  product        = stripe_product.blockchain_integration.id
  unit_amount    = 300000 # $3,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily network monitoring, comprehensive security audits, real-time protocol updates, advanced analytics, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "blockchain_custom" {
#   currency       = "usd"
#   product        = stripe_product.blockchain_integration.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on blockchain complexity and network requirements"
#     phase    = "mrr"
#   }
# }

# 5. Gambling or iGaming
resource "stripe_product" "gambling_igaming" {
  name        = "Gambling & iGaming Compliance Management"
  description = "Comprehensive gaming compliance with regulatory monitoring, RNG verification, security audits, and responsible gaming features"
  active      = true

  metadata = {
    category             = "gaming"
    type                 = "mrr_service"
    ongoing_requirements = "Regulatory compliance monitoring, RNG verification, security audits, responsible gaming features, jurisdictional updates"
    mrr_justification    = "Fixed monthly fee ($2,000-$10,000) plus percentage of revenue (5-10%) for compliance and security"
    phase                = "mrr"
  }
}

# resource "stripe_price" "gambling_free" {
#   currency    = "usd"
#   product     = stripe_product.gambling_igaming.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small gaming businesses,Startups,Basic gaming platforms"
#     features_included = "Self-managed gaming platform,Basic compliance setup"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No compliance monitoring,No RNG verification"
#     upgrade_path      = "Basic tier recommended for regulated gaming platforms"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "gambling_basic" {
  currency       = "usd"
  product        = stripe_product.gambling_igaming.id
  unit_amount    = 200000 # $2,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly compliance monitoring, basic RNG verification, security audits"
    phase    = "mrr"
  }
}

resource "stripe_price" "gambling_standard" {
  currency       = "usd"
  product        = stripe_product.gambling_igaming.id
  unit_amount    = 500000 # $5,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly compliance monitoring, advanced RNG verification, comprehensive security audits, responsible gaming features"
    phase    = "mrr"
  }
}

resource "stripe_price" "gambling_premium" {
  currency       = "usd"
  product        = stripe_product.gambling_igaming.id
  unit_amount    = 1000000 # $10,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily compliance monitoring, real-time RNG verification, advanced security, jurisdictional updates, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "gambling_custom" {
#   currency       = "usd"
#   product        = stripe_product.gambling_igaming.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on gaming complexity and regulatory requirements"
#     phase    = "mrr"
#   }
# }

# 6. Real-time Features
resource "stripe_product" "real_time_features" {
  name        = "Real-time Features Management"
  description = "Real-time infrastructure management with server monitoring, uptime guarantees, scaling optimization, and WebSocket maintenance"
  active      = true

  metadata = {
    category             = "infrastructure"
    type                 = "mrr_service"
    ongoing_requirements = "Server monitoring, uptime guarantees, scaling optimization, WebSocket maintenance, performance monitoring"
    mrr_justification    = "Fixed monthly fee ($500-$2,000) for infrastructure monitoring and scaling"
    phase                = "mrr"
  }
}

# resource "stripe_price" "real_time_free" {
#   currency    = "usd"
#   product     = stripe_product.real_time_features.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small applications,Startups,Basic real-time needs"
#     features_included = "Self-managed real-time features,Basic WebSocket implementation"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No server monitoring,No uptime guarantees"
#     upgrade_path      = "Basic tier recommended for production real-time applications"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "real_time_basic" {
  currency       = "usd"
  product        = stripe_product.real_time_features.id
  unit_amount    = 50000 # $500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly server monitoring, basic uptime monitoring, WebSocket maintenance"
    phase    = "mrr"
  }
}

resource "stripe_price" "real_time_standard" {
  currency       = "usd"
  product        = stripe_product.real_time_features.id
  unit_amount    = 125000 # $1,250.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly performance monitoring, scaling optimization, advanced WebSocket management"
    phase    = "mrr"
  }
}

resource "stripe_price" "real_time_premium" {
  currency       = "usd"
  product        = stripe_product.real_time_features.id
  unit_amount    = 200000 # $2,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily monitoring, 99.9% uptime guarantee, auto-scaling, real-time optimization, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "real_time_custom" {
#   currency       = "usd"
#   product        = stripe_product.real_time_features.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on real-time feature complexity and traffic volume"
#     phase    = "mrr"
#   }
# }

# 7. Automated Digital Marketing
resource "stripe_product" "automated_digital_marketing" {
  name        = "Automated Digital Marketing Management"
  description = "Comprehensive digital marketing automation with campaign monitoring, ad optimization, content generation, and SEO management"
  active      = true

  metadata = {
    category             = "marketing"
    type                 = "mrr_service"
    ongoing_requirements = "Campaign performance monitoring, ad optimization, content generation, SEO monitoring, platform API updates"
    mrr_justification    = "Percentage of ad spend (10-20%) or fixed monthly fee ($1,000-$3,000)"
    phase                = "mrr"
  }
}

# resource "stripe_price" "marketing_free" {
#   currency    = "usd"
#   product     = stripe_product.automated_digital_marketing.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic marketing needs"
#     features_included = "Self-managed marketing campaigns,Basic social media setup"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No campaign monitoring,No optimization"
#     upgrade_path      = "Basic tier recommended for professional marketing campaigns"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "marketing_basic" {
  currency       = "usd"
  product        = stripe_product.automated_digital_marketing.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly campaign monitoring, basic ad optimization, content scheduling"
    phase    = "mrr"
  }
}

resource "stripe_price" "marketing_standard" {
  currency       = "usd"
  product        = stripe_product.automated_digital_marketing.id
  unit_amount    = 200000 # $2,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly performance monitoring, advanced optimization, SEO monitoring, content generation"
    phase    = "mrr"
  }
}

resource "stripe_price" "marketing_premium" {
  currency       = "usd"
  product        = stripe_product.automated_digital_marketing.id
  unit_amount    = 300000 # $3,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily campaign optimization, advanced analytics, automated content creation, multi-platform management, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "marketing_custom" {
#   currency       = "usd"
#   product        = stripe_product.automated_digital_marketing.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on ad spend volume and marketing complexity"
#     phase    = "mrr"
#   }
# }

# 8. Autoblogger (AI Content Generation)
resource "stripe_product" "autoblogger" {
  name        = "Autoblogger AI Content Management"
  description = "AI-powered content generation with quality monitoring, SEO optimization, publishing automation, and performance analytics"
  active      = true

  metadata = {
    category             = "content"
    type                 = "mrr_service"
    ongoing_requirements = "Content quality monitoring, SEO optimization, publishing automation, AI model updates, performance analytics"
    mrr_justification    = "Fixed monthly fee ($500-$2,000) based on content volume"
    phase                = "mrr"
  }
}

# resource "stripe_price" "autoblogger_free" {
#   currency    = "usd"
#   product     = stripe_product.autoblogger.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic content needs"
#     features_included = "Self-managed content creation,Basic blogging platform"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No content quality monitoring,No SEO optimization"
#     upgrade_path      = "Basic tier recommended for professional content creation"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "autoblogger_basic" {
  currency       = "usd"
  product        = stripe_product.autoblogger.id
  unit_amount    = 50000 # $500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly content quality monitoring, basic SEO optimization, automated publishing"
    phase    = "mrr"
  }
}

resource "stripe_price" "autoblogger_standard" {
  currency       = "usd"
  product        = stripe_product.autoblogger.id
  unit_amount    = 125000 # $1,250.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly content monitoring, advanced SEO optimization, AI model updates, performance analytics"
    phase    = "mrr"
  }
}

resource "stripe_price" "autoblogger_premium" {
  currency       = "usd"
  product        = stripe_product.autoblogger.id
  unit_amount    = 200000 # $2,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily content optimization, advanced AI models, real-time SEO monitoring, comprehensive analytics, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "autoblogger_custom" {
#   currency       = "usd"
#   product        = stripe_product.autoblogger.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on content volume and specific blogging requirements"
#     phase    = "mrr"
#   }
# }

# 9. Publisher (Ad Revenue)
resource "stripe_product" "publisher" {
  name        = "Publisher Ad Revenue Management"
  description = "Ad network optimization and revenue management with ad placement monitoring, compliance, and performance tracking"
  active      = true

  metadata = {
    category             = "publishing"
    type                 = "mrr_service"
    ongoing_requirements = "Ad network optimization, revenue tracking, ad placement monitoring, compliance with ad policies"
    mrr_justification    = "Percentage of ad revenue (10-15%) for optimization services"
    phase                = "mrr"
  }
}

# resource "stripe_price" "publisher_free" {
#   currency    = "usd"
#   product     = stripe_product.publisher.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small publishers,Startups,Basic ad monetization needs"
#     features_included = "Self-managed ad placements,Basic ad network integration"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No ad optimization,No performance tracking"
#     upgrade_path      = "Basic tier recommended for professional ad monetization"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "publisher_basic" {
  currency       = "usd"
  product        = stripe_product.publisher.id
  unit_amount    = 50000 # $500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier          = "basic"
    features      = "Monthly ad optimization, basic revenue tracking, ad placement monitoring"
    revenue_share = "10%"
    phase         = "mrr"
  }
}

resource "stripe_price" "publisher_standard" {
  currency       = "usd"
  product        = stripe_product.publisher.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier          = "standard"
    features      = "Weekly optimization, advanced revenue tracking, multi-network management, compliance monitoring"
    revenue_share = "12%"
    phase         = "mrr"
  }
}

resource "stripe_price" "publisher_premium" {
  currency       = "usd"
  product        = stripe_product.publisher.id
  unit_amount    = 200000 # $2,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier          = "premium"
    features      = "Daily optimization, comprehensive analytics, advanced ad targeting, policy compliance, 24/7 support"
    revenue_share = "15%"
    phase         = "mrr"
  }
}

# resource "stripe_price" "publisher_custom" {
#   currency       = "usd"
#   product        = stripe_product.publisher.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom revenue share percentage based on ad revenue volume and specific requirements"
#     phase    = "mrr"
#   }
# }

# 10. Customer Support Chatbot
resource "stripe_product" "customer_support_chatbot" {
  name        = "Customer Support Chatbot Management"
  description = "AI-powered customer support with training updates, performance monitoring, conversation analytics, and integration maintenance"
  active      = true

  metadata = {
    category             = "support"
    type                 = "mrr_service"
    ongoing_requirements = "Training data updates, performance monitoring, conversation analytics, integration maintenance"
    mrr_justification    = "Fixed monthly fee ($300-$1,000) for chatbot maintenance and optimization"
    phase                = "mrr"
  }
}

# resource "stripe_price" "support_chatbot_free" {
#   currency    = "usd"
#   product     = stripe_product.customer_support_chatbot.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic customer support needs"
#     features_included = "Self-managed chatbot implementation,Basic conversation handling"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No training updates,No performance monitoring"
#     upgrade_path      = "Basic tier recommended for professional customer support"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "support_chatbot_basic" {
  currency       = "usd"
  product        = stripe_product.customer_support_chatbot.id
  unit_amount    = 30000 # $300.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly training updates, basic performance monitoring, conversation analytics"
    phase    = "mrr"
  }
}

resource "stripe_price" "support_chatbot_standard" {
  currency       = "usd"
  product        = stripe_product.customer_support_chatbot.id
  unit_amount    = 65000 # $650.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly training updates, advanced monitoring, detailed analytics, integration maintenance"
    phase    = "mrr"
  }
}

resource "stripe_price" "support_chatbot_premium" {
  currency       = "usd"
  product        = stripe_product.customer_support_chatbot.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily training updates, real-time monitoring, advanced analytics, multi-channel support, 24/7 maintenance"
    phase    = "mrr"
  }
}

# resource "stripe_price" "support_chatbot_custom" {
#   currency       = "usd"
#   product        = stripe_product.customer_support_chatbot.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on conversation volume and support complexity"
#     phase    = "mrr"
#   }
# }

# 11. Sales Chatbot
resource "stripe_product" "sales_chatbot" {
  name        = "Sales Chatbot Management"
  description = "AI-powered sales assistance with lead qualification, conversion tracking, messaging optimization, and integration monitoring"
  active      = true

  metadata = {
    category             = "sales"
    type                 = "mrr_service"
    ongoing_requirements = "Lead qualification updates, conversion tracking, messaging optimization, integration monitoring"
    mrr_justification    = "Fixed monthly fee ($400-$1,500) or percentage of sales (5-10%)"
    phase                = "mrr"
  }
}

# resource "stripe_price" "sales_chatbot_free" {
#   currency    = "usd"
#   product     = stripe_product.sales_chatbot.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic sales needs"
#     features_included = "Self-managed sales chatbot,Basic lead capture"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No lead qualification,No conversion tracking"
#     upgrade_path      = "Basic tier recommended for professional sales automation"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "sales_chatbot_basic" {
  currency       = "usd"
  product        = stripe_product.sales_chatbot.id
  unit_amount    = 40000 # $400.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly lead qualification updates, basic conversion tracking, messaging optimization"
    phase    = "mrr"
  }
}

resource "stripe_price" "sales_chatbot_standard" {
  currency       = "usd"
  product        = stripe_product.sales_chatbot.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly optimization, advanced lead scoring, detailed conversion analytics, integration monitoring"
    phase    = "mrr"
  }
}

resource "stripe_price" "sales_chatbot_premium" {
  currency       = "usd"
  product        = stripe_product.sales_chatbot.id
  unit_amount    = 150000 # $1,500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily optimization, predictive lead scoring, real-time conversion tracking, multi-channel sales, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "sales_chatbot_custom" {
#   currency       = "usd"
#   product        = stripe_product.sales_chatbot.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on sales volume and lead complexity"
#     phase    = "mrr"
#   }
# }

# 12. CRM System
resource "stripe_product" "crm_system" {
  name        = "CRM System Management"
  description = "Customer relationship management with data synchronization, integration monitoring, custom workflows, and user training"
  active      = true

  metadata = {
    category             = "crm"
    type                 = "mrr_service"
    ongoing_requirements = "Data synchronization, integration monitoring, custom workflow updates, user training"
    mrr_justification    = "Fixed monthly fee ($500-$2,000) for CRM maintenance and support"
    phase                = "mrr"
  }
}

# resource "stripe_price" "crm_free" {
#   currency    = "usd"
#   product     = stripe_product.crm_system.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic CRM needs"
#     features_included = "Self-managed CRM,Basic contact management"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No data synchronization,No integration monitoring"
#     upgrade_path      = "Basic tier recommended for professional CRM management"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "crm_basic" {
  currency       = "usd"
  product        = stripe_product.crm_system.id
  unit_amount    = 50000 # $500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly data synchronization, basic integration monitoring, workflow updates"
    phase    = "mrr"
  }
}

resource "stripe_price" "crm_standard" {
  currency       = "usd"
  product        = stripe_product.crm_system.id
  unit_amount    = 125000 # $1,250.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly synchronization, advanced integration monitoring, custom workflow development, user training"
    phase    = "mrr"
  }
}

resource "stripe_price" "crm_premium" {
  currency       = "usd"
  product        = stripe_product.crm_system.id
  unit_amount    = 200000 # $2,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily synchronization, comprehensive integration monitoring, advanced workflow automation, ongoing training, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "crm_custom" {
#   currency       = "usd"
#   product        = stripe_product.crm_system.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on user count and integration complexity"
#     phase    = "mrr"
#   }
# }

# 12.5. General Maintenance Retainer
resource "stripe_product" "general_maintenance_retainer" {
  name        = "General Maintenance Retainer"
  description = "Comprehensive application maintenance and support retainer that ensures your digital products remain secure, performant, and up-to-date. From proactive monitoring and security updates to performance optimization and feature enhancements, our retainer service provides ongoing peace of mind with predictable monthly costs. Perfect for businesses that want to focus on growth while we handle the technical maintenance."
  active      = true

  metadata = {
    category            = "maintenance"
    type                = "retainer"
    phase               = "mrr"
    target_businesses   = "SaaS companies,E-commerce platforms,Web applications,Enterprise systems"
    service_scope       = "Security updates,Performance monitoring,Bug fixes,Feature enhancements,Technical support"
    response_times      = "Critical: < 1 hour,High: < 4 hours,Normal: < 24 hours"
    monitoring_included = "24/7 uptime monitoring,Error tracking,Performance metrics,Security alerts"
    deliverables        = "Monthly maintenance reports,Security audit summaries,Performance optimization recommendations"
    business_value      = "Reduce downtime by 90%,Prevent security vulnerabilities,Maintain peak performance,Focus on core business"
    typical_clients     = "Growing SaaS companies,E-commerce businesses,Established web applications"
  }
}

# resource "stripe_price" "maintenance_retainer_free" {
#   currency    = "usd"
#   product     = stripe_product.general_maintenance_retainer.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier                = "free"
#     target_businesses   = "Small businesses,Startups,Simple web applications"
#     monthly_hours       = "0 hours included"
#     features_included   = "Basic uptime monitoring,Self-service documentation,Community support"
#     support_level       = "No ongoing support available - self-managed, self-serviced tier"
#     management_type     = "Self-managed and self-serviced"
#     limitations         = "No dedicated support,No proactive maintenance,Limited monitoring"
#     upgrade_path        = "Basic tier recommended for growing applications"
#     response_time       = "Best effort"
#     monitoring_features = "Basic uptime checks only"
#     phase               = "mrr"
#   }
# }

resource "stripe_price" "maintenance_retainer_basic" {
  currency       = "usd"
  product        = stripe_product.general_maintenance_retainer.id
  unit_amount    = 75000 # $750.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                = "basic"
    target_businesses   = "Growing web applications,Small SaaS products,E-commerce sites"
    monthly_hours       = "20 hours included"
    features_included   = "Monthly security updates,Basic performance monitoring,Bug fixes,Email support,Monthly maintenance reports"
    response_time       = "< 24 hours"
    monitoring_features = "24/7 uptime monitoring,Error tracking,Basic performance alerts"
    included_services   = "Security patches,Dependency updates,Basic optimization"
    support_level       = "Email support,Monthly strategy calls"
    business_value      = "Prevent security issues,Basic performance monitoring,Reliable bug fixes"
    phase               = "mrr"
  }
}

resource "stripe_price" "maintenance_retainer_standard" {
  currency       = "usd"
  product        = stripe_product.general_maintenance_retainer.id
  unit_amount    = 150000 # $1,500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                = "standard"
    target_businesses   = "Established SaaS companies,Mid-market e-commerce,Growing enterprise applications"
    monthly_hours       = "40 hours included"
    features_included   = "Comprehensive security monitoring,Advanced performance optimization,Priority bug fixes,Feature enhancements,Phone support,Bi-weekly maintenance reports"
    response_time       = "< 12 hours"
    monitoring_features = "Real-time performance monitoring,Advanced error tracking,Security threat detection,Custom alerts"
    included_services   = "Proactive security audits,Performance optimization,Database maintenance,Backup monitoring"
    support_level       = "Phone & email support,Bi-weekly strategy calls,Dedicated account manager"
    business_value      = "Proactive maintenance,Advanced monitoring,Performance optimization,Priority support"
    phase               = "mrr"
  }
}

resource "stripe_price" "maintenance_retainer_premium" {
  currency       = "usd"
  product        = stripe_product.general_maintenance_retainer.id
  unit_amount    = 250000 # $2,500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier                = "premium"
    target_businesses   = "Large SaaS platforms,Enterprise applications,High-traffic systems,Mission-critical services"
    monthly_hours       = "80 hours included"
    features_included   = "Enterprise security management,Advanced performance optimization,Major feature development,24/7 phone support,Weekly maintenance reports,Custom integrations"
    response_time       = "< 4 hours"
    monitoring_features = "Enterprise monitoring suite,Custom dashboards,Predictive analytics,Advanced threat detection"
    included_services   = "Security penetration testing,Performance audits,Scalability optimization,Custom development"
    support_level       = "24/7 phone support,Dedicated DevOps team,Weekly executive reports,On-site support available"
    business_value      = "Enterprise-grade maintenance,24/7 support,Custom development,Maximum uptime"
    phase               = "mrr"
  }
}

# resource "stripe_price" "maintenance_retainer_custom" {
#   currency       = "usd"
#   product        = stripe_product.general_maintenance_retainer.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier                = "custom"
#     target_businesses   = "Large enterprises,Complex multi-system environments,Highly specialized applications"
#     monthly_hours       = "Custom hours based on requirements"
#     features_included   = "Fully customized maintenance plan,White-label support,Dedicated team,Custom SLAs,Advanced integrations"
#     response_time       = "Custom SLA-based"
#     monitoring_features = "Custom monitoring stack,Advanced analytics,Custom reporting"
#     included_services   = "Custom development,Specialized security,Compliance management,Legacy system support"
#     support_level       = "Custom support model,Dedicated account team,Custom communication channels"
#     business_value      = "Tailored maintenance solution,Custom SLAs,Dedicated resources,Specialized expertise"
#     phase               = "mrr"
#   }
# }

# Medium-Priority MRR Candidates

# 13. API Development
resource "stripe_product" "api_development" {
  name        = "API Development & Management"
  description = "API infrastructure management with monitoring, version control, documentation updates, and performance optimization"
  active      = true

  metadata = {
    category             = "api"
    type                 = "mrr_service"
    ongoing_requirements = "API monitoring, version management, documentation updates, performance optimization"
    mrr_justification    = "Fixed monthly fee ($300-$1,000) for API maintenance"
    phase                = "mrr"
  }
}

# resource "stripe_price" "api_free" {
#   currency    = "usd"
#   product     = stripe_product.api_development.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic API needs"
#     features_included = "Self-managed API development,Basic documentation"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No monitoring,No version control"
#     upgrade_path      = "Basic tier recommended for production API management"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "api_basic" {
  currency       = "usd"
  product        = stripe_product.api_development.id
  unit_amount    = 30000 # $300.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly API monitoring, version control, documentation updates"
    phase    = "mrr"
  }
}

resource "stripe_price" "api_standard" {
  currency       = "usd"
  product        = stripe_product.api_development.id
  unit_amount    = 65000 # $650.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly monitoring, advanced version management, performance optimization, detailed documentation"
    phase    = "mrr"
  }
}

resource "stripe_price" "api_premium" {
  currency       = "usd"
  product        = stripe_product.api_development.id
  unit_amount    = 100000 # $1,000.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily monitoring, automated version management, advanced optimization, comprehensive documentation, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "api_custom" {
#   currency       = "usd"
#   product        = stripe_product.api_development.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on API complexity and usage volume"
#     phase    = "mrr"
#   }
# }

# 14. Google Play Store + iOS App Store
resource "stripe_product" "app_store_management" {
  name        = "App Store Management"
  description = "Mobile app store management with compliance monitoring, update submissions, review management, and crash reporting"
  active      = true

  metadata = {
    category             = "mobile"
    type                 = "mrr_service"
    ongoing_requirements = "App store compliance, update submissions, review monitoring, crash reporting"
    mrr_justification    = "Fixed monthly fee ($200-$500) per platform for app store management"
    phase                = "mrr"
  }
}

# resource "stripe_price" "app_store_free" {
#   currency    = "usd"
#   product     = stripe_product.app_store_management.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic mobile apps"
#     features_included = "Self-managed app store presence,Basic app submission"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No compliance monitoring,No update management"
#     upgrade_path      = "Basic tier recommended for professional app store management"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "app_store_basic" {
  currency       = "usd"
  product        = stripe_product.app_store_management.id
  unit_amount    = 20000 # $200.00 per month per platform
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly compliance monitoring, update submissions, basic review management"
    phase    = "mrr"
  }
}

resource "stripe_price" "app_store_standard" {
  currency       = "usd"
  product        = stripe_product.app_store_management.id
  unit_amount    = 35000 # $350.00 per month per platform
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly monitoring, priority update submissions, detailed review management, crash reporting"
    phase    = "mrr"
  }
}

resource "stripe_price" "app_store_premium" {
  currency       = "usd"
  product        = stripe_product.app_store_management.id
  unit_amount    = 50000 # $500.00 per month per platform
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily monitoring, expedited submissions, comprehensive review management, advanced analytics, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "app_store_custom" {
#   currency       = "usd"
#   product        = stripe_product.app_store_management.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on app complexity and platform requirements"
#     phase    = "mrr"
#   }
# }

# 15. Blog with CMS
resource "stripe_product" "blog_cms" {
  name        = "Blog & CMS Management"
  description = "Content management system with security updates, content migration, SEO monitoring, and plugin maintenance"
  active      = true

  metadata = {
    category             = "content"
    type                 = "mrr_service"
    ongoing_requirements = "Security updates, content migration, SEO monitoring, plugin maintenance"
    mrr_justification    = "Fixed monthly fee ($200-$600) for CMS maintenance"
    phase                = "mrr"
  }
}

# resource "stripe_price" "blog_cms_free" {
#   currency    = "usd"
#   product     = stripe_product.blog_cms.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic content needs"
#     features_included = "Self-managed blog/CMS,Basic content management"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No security updates,No SEO monitoring"
#     upgrade_path      = "Basic tier recommended for professional content management"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "blog_cms_basic" {
  currency       = "usd"
  product        = stripe_product.blog_cms.id
  unit_amount    = 20000 # $200.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly security updates, basic SEO monitoring, plugin maintenance"
    phase    = "mrr"
  }
}

resource "stripe_price" "blog_cms_standard" {
  currency       = "usd"
  product        = stripe_product.blog_cms.id
  unit_amount    = 40000 # $400.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly updates, advanced SEO monitoring, content migration, detailed plugin management"
    phase    = "mrr"
  }
}

resource "stripe_price" "blog_cms_premium" {
  currency       = "usd"
  product        = stripe_product.blog_cms.id
  unit_amount    = 60000 # $600.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily monitoring, comprehensive security, advanced SEO optimization, automated migrations, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "blog_cms_custom" {
#   currency       = "usd"
#   product        = stripe_product.blog_cms.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on content volume and CMS complexity"
#     phase    = "mrr"
#   }
# }

# 16. Internationalization
resource "stripe_product" "internationalization" {
  name        = "Internationalization Management"
  description = "Multi-language support with translation updates, localization testing, cultural adaptation, and language pack maintenance"
  active      = true

  metadata = {
    category             = "localization"
    type                 = "mrr_service"
    ongoing_requirements = "Translation updates, localization testing, cultural adaptation, language pack maintenance"
    mrr_justification    = "Fixed monthly fee ($300-$800) for localization support"
    phase                = "mrr"
  }
}

# resource "stripe_price" "i18n_free" {
#   currency    = "usd"
#   product     = stripe_product.internationalization.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic internationalization needs"
#     features_included = "Self-managed internationalization,Basic language support"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No translation updates,No localization testing"
#     upgrade_path      = "Basic tier recommended for multi-language applications"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "i18n_basic" {
  currency       = "usd"
  product        = stripe_product.internationalization.id
  unit_amount    = 30000 # $300.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly translation updates, basic localization testing, language pack maintenance"
    phase    = "mrr"
  }
}

resource "stripe_price" "i18n_standard" {
  currency       = "usd"
  product        = stripe_product.internationalization.id
  unit_amount    = 55000 # $550.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly updates, advanced localization testing, cultural adaptation, multi-language support"
    phase    = "mrr"
  }
}

resource "stripe_price" "i18n_premium" {
  currency       = "usd"
  product        = stripe_product.internationalization.id
  unit_amount    = 80000 # $800.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily updates, comprehensive localization, cultural adaptation, advanced testing, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "i18n_custom" {
#   currency       = "usd"
#   product        = stripe_product.internationalization.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on language count and localization complexity"
#     phase    = "mrr"
#   }
# }

# 17. SSO/Social Login
resource "stripe_product" "sso_social_login" {
  name        = "SSO & Social Login Management"
  description = "Authentication management with provider API monitoring, security updates, and authentication flow maintenance"
  active      = true

  metadata = {
    category             = "authentication"
    type                 = "mrr_service"
    ongoing_requirements = "Provider API monitoring, security updates, authentication flow maintenance"
    mrr_justification    = "Fixed monthly fee ($200-$500) for authentication monitoring"
    phase                = "mrr"
  }
}

# resource "stripe_price" "sso_free" {
#   currency    = "usd"
#   product     = stripe_product.sso_social_login.id
#   unit_amount = 0
#   active      = true

#   metadata = {
#     tier              = "free"
#     target_businesses = "Small businesses,Startups,Basic authentication needs"
#     features_included = "Self-managed authentication,Basic social login setup"
#     support_level     = "No ongoing support available - self-managed, self-serviced tier"
#     management_type   = "Self-managed and self-serviced"
#     limitations       = "No dedicated support,No API monitoring,No security updates"
#     upgrade_path      = "Basic tier recommended for professional authentication management"
#     phase             = "mrr"
#   }
# }

resource "stripe_price" "sso_basic" {
  currency       = "usd"
  product        = stripe_product.sso_social_login.id
  unit_amount    = 20000 # $200.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "basic"
    features = "Monthly API monitoring, basic security updates, authentication flow maintenance"
    phase    = "mrr"
  }
}

resource "stripe_price" "sso_standard" {
  currency       = "usd"
  product        = stripe_product.sso_social_login.id
  unit_amount    = 35000 # $350.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "standard"
    features = "Weekly monitoring, advanced security updates, multi-provider management, detailed logging"
    phase    = "mrr"
  }
}

resource "stripe_price" "sso_premium" {
  currency       = "usd"
  product        = stripe_product.sso_social_login.id
  unit_amount    = 50000 # $500.00 per month
  active         = true
  billing_scheme = "per_unit"
  recurring {
    interval       = "month"
    interval_count = 1
  }

  metadata = {
    tier     = "premium"
    features = "Daily monitoring, comprehensive security, advanced authentication flows, real-time alerts, 24/7 support"
    phase    = "mrr"
  }
}

# resource "stripe_price" "sso_custom" {
#   currency       = "usd"
#   product        = stripe_product.sso_social_login.id
#   active         = true
#   billing_scheme = "tiered"

#   tiers {
#     unit_amount = 0
#   }

#   tiers_mode = "volume"

#   metadata = {
#     tier     = "custom"
#     features = "Custom pricing based on provider count and authentication complexity"
#     phase    = "mrr"
#   }
# }
