# =============================================================================
# OUTPUTS
# =============================================================================

# Productization Phase Products
output "digital_marketing_product_id" {
  description = "Digital Marketing Package Product ID"
  value       = stripe_product.digital_marketing_package.id
}

output "managed_devops_starter_product_id" {
  description = "Managed DevOps Starter Product ID"
  value       = stripe_product.managed_devops_starter.id
}

output "managed_devops_basic_product_id" {
  description = "Managed DevOps Basic Product ID"
  value       = stripe_product.managed_devops_basic.id
}

output "managed_devops_standard_product_id" {
  description = "Managed DevOps Standard Product ID"
  value       = stripe_product.managed_devops_standard.id
}

output "managed_devops_enterprise_product_id" {
  description = "Managed DevOps Enterprise Product ID"
  value       = stripe_product.managed_devops_enterprise.id
}

output "digital_marketing_basic_price_id" {
  description = "Digital Marketing Basic Price ID"
  value       = stripe_price.digital_marketing_basic.id
}

output "digital_marketing_standard_price_id" {
  description = "Digital Marketing Standard Price ID"
  value       = stripe_price.digital_marketing_standard.id
}

output "digital_marketing_premium_price_id" {
  description = "Digital Marketing Premium Price ID"
  value       = stripe_price.digital_marketing_premium.id
}

output "devops_basic_price_id" {
  description = "DevOps Basic Price ID"
  value       = stripe_price.devops_basic.id
}

output "devops_starter_price_id" {
  description = "DevOps Starter Price ID"
  value       = stripe_price.devops_starter.id
}

output "devops_standard_price_id" {
  description = "DevOps Standard Price ID"
  value       = stripe_price.devops_standard.id
}

output "devops_enterprise_price_id" {
  description = "DevOps Enterprise Price ID"
  value       = stripe_price.devops_enterprise.id
}

output "analytics_tracking_basic_product_id" {
  description = "Analytics Tracking Basic Product ID"
  value       = stripe_product.analytics_tracking_basic.id
}

output "analytics_tracking_standard_product_id" {
  description = "Analytics Tracking Standard Product ID"
  value       = stripe_product.analytics_tracking_standard.id
}

output "analytics_tracking_premium_product_id" {
  description = "Analytics Tracking Premium Product ID"
  value       = stripe_product.analytics_tracking_premium.id
}

output "ai_ml_features_basic_product_id" {
  description = "AI/ML Features Basic Product ID"
  value       = stripe_product.ai_ml_features_basic.id
}

output "ai_ml_features_standard_product_id" {
  description = "AI/ML Features Standard Product ID"
  value       = stripe_product.ai_ml_features_standard.id
}

output "ai_ml_features_premium_product_id" {
  description = "AI/ML Features Premium Product ID"
  value       = stripe_product.ai_ml_features_premium.id
}

output "blockchain_integration_product_id" {
  description = "Blockchain Integration Product ID"
  value       = stripe_product.blockchain_integration.id
}

output "gambling_igaming_product_id" {
  description = "Gambling & iGaming Product ID"
  value       = stripe_product.gambling_igaming.id
}

output "real_time_features_product_id" {
  description = "Real-time Features Product ID"
  value       = stripe_product.real_time_features.id
}

output "automated_digital_marketing_product_id" {
  description = "Automated Digital Marketing Product ID"
  value       = stripe_product.automated_digital_marketing.id
}

output "autoblogger_product_id" {
  description = "Autoblogger Product ID"
  value       = stripe_product.autoblogger.id
}

output "publisher_product_id" {
  description = "Publisher Product ID"
  value       = stripe_product.publisher.id
}

output "customer_support_chatbot_product_id" {
  description = "Customer Support Chatbot Product ID"
  value       = stripe_product.customer_support_chatbot.id
}

output "sales_chatbot_product_id" {
  description = "Sales Chatbot Product ID"
  value       = stripe_product.sales_chatbot.id
}

output "crm_system_product_id" {
  description = "CRM System Product ID"
  value       = stripe_product.crm_system.id
}

output "general_maintenance_retainer_product_id" {
  description = "General Maintenance Retainer Product ID"
  value       = stripe_product.general_maintenance_retainer.id
}

# MRR Services - Medium Priority
output "api_development_product_id" {
  description = "API Development Product ID"
  value       = stripe_product.api_development.id
}

output "app_store_management_product_id" {
  description = "App Store Management Product ID"
  value       = stripe_product.app_store_management.id
}

output "blog_cms_product_id" {
  description = "Blog & CMS Product ID"
  value       = stripe_product.blog_cms.id
}

output "internationalization_product_id" {
  description = "Internationalization Product ID"
  value       = stripe_product.internationalization.id
}

output "sso_social_login_product_id" {
  description = "SSO & Social Login Product ID"
  value       = stripe_product.sso_social_login.id
}

# Price IDs for MRR Services
output "payment_processing_basic_price_id" {
  description = "Payment Processing Basic Price ID"
  value       = stripe_price.payment_processing_basic.id
}

output "payment_processing_standard_price_id" {
  description = "Payment Processing Standard Price ID"
  value       = stripe_price.payment_processing_standard.id
}

output "payment_processing_premium_price_id" {
  description = "Payment Processing Premium Price ID"
  value       = stripe_price.payment_processing_premium.id
}

output "analytics_basic_price_id" {
  description = "Analytics Basic Price ID"
  value       = stripe_price.analytics_basic.id
}

output "analytics_standard_price_id" {
  description = "Analytics Standard Price ID"
  value       = stripe_price.analytics_standard.id
}

output "analytics_premium_price_id" {
  description = "Analytics Premium Price ID"
  value       = stripe_price.analytics_premium.id
}

output "ai_ml_basic_price_id" {
  description = "AI/ML Basic Price ID"
  value       = stripe_price.ai_ml_basic.id
}

output "ai_ml_standard_price_id" {
  description = "AI/ML Standard Price ID"
  value       = stripe_price.ai_ml_standard.id
}

output "ai_ml_premium_price_id" {
  description = "AI/ML Premium Price ID"
  value       = stripe_price.ai_ml_premium.id
}

output "blockchain_basic_price_id" {
  description = "Blockchain Basic Price ID"
  value       = stripe_price.blockchain_basic.id
}

output "blockchain_standard_price_id" {
  description = "Blockchain Standard Price ID"
  value       = stripe_price.blockchain_standard.id
}

output "blockchain_premium_price_id" {
  description = "Blockchain Premium Price ID"
  value       = stripe_price.blockchain_premium.id
}

output "gambling_basic_price_id" {
  description = "Gambling Basic Price ID"
  value       = stripe_price.gambling_basic.id
}

output "gambling_standard_price_id" {
  description = "Gambling Standard Price ID"
  value       = stripe_price.gambling_standard.id
}

output "gambling_premium_price_id" {
  description = "Gambling Premium Price ID"
  value       = stripe_price.gambling_premium.id
}

output "real_time_basic_price_id" {
  description = "Real-time Basic Price ID"
  value       = stripe_price.real_time_basic.id
}

output "real_time_standard_price_id" {
  description = "Real-time Standard Price ID"
  value       = stripe_price.real_time_standard.id
}

output "real_time_premium_price_id" {
  description = "Real-time Premium Price ID"
  value       = stripe_price.real_time_premium.id
}

output "marketing_basic_price_id" {
  description = "Marketing Basic Price ID"
  value       = stripe_price.marketing_basic.id
}

output "marketing_standard_price_id" {
  description = "Marketing Standard Price ID"
  value       = stripe_price.marketing_standard.id
}

output "marketing_premium_price_id" {
  description = "Marketing Premium Price ID"
  value       = stripe_price.marketing_premium.id
}

output "autoblogger_basic_price_id" {
  description = "Autoblogger Basic Price ID"
  value       = stripe_price.autoblogger_basic.id
}

output "autoblogger_standard_price_id" {
  description = "Autoblogger Standard Price ID"
  value       = stripe_price.autoblogger_standard.id
}

output "autoblogger_premium_price_id" {
  description = "Autoblogger Premium Price ID"
  value       = stripe_price.autoblogger_premium.id
}

output "publisher_basic_price_id" {
  description = "Publisher Basic Price ID"
  value       = stripe_price.publisher_basic.id
}

output "publisher_standard_price_id" {
  description = "Publisher Standard Price ID"
  value       = stripe_price.publisher_standard.id
}

output "publisher_premium_price_id" {
  description = "Publisher Premium Price ID"
  value       = stripe_price.publisher_premium.id
}

output "support_chatbot_basic_price_id" {
  description = "Support Chatbot Basic Price ID"
  value       = stripe_price.support_chatbot_basic.id
}

output "support_chatbot_standard_price_id" {
  description = "Support Chatbot Standard Price ID"
  value       = stripe_price.support_chatbot_standard.id
}

output "support_chatbot_premium_price_id" {
  description = "Support Chatbot Premium Price ID"
  value       = stripe_price.support_chatbot_premium.id
}

output "sales_chatbot_basic_price_id" {
  description = "Sales Chatbot Basic Price ID"
  value       = stripe_price.sales_chatbot_basic.id
}

output "sales_chatbot_standard_price_id" {
  description = "Sales Chatbot Standard Price ID"
  value       = stripe_price.sales_chatbot_standard.id
}

output "sales_chatbot_premium_price_id" {
  description = "Sales Chatbot Premium Price ID"
  value       = stripe_price.sales_chatbot_premium.id
}

output "crm_basic_price_id" {
  description = "CRM Basic Price ID"
  value       = stripe_price.crm_basic.id
}

output "crm_standard_price_id" {
  description = "CRM Standard Price ID"
  value       = stripe_price.crm_standard.id
}

output "crm_premium_price_id" {
  description = "CRM Premium Price ID"
  value       = stripe_price.crm_premium.id
}

output "maintenance_retainer_basic_price_id" {
  description = "Maintenance Retainer Basic Price ID"
  value       = stripe_price.maintenance_retainer_basic.id
}

output "maintenance_retainer_standard_price_id" {
  description = "Maintenance Retainer Standard Price ID"
  value       = stripe_price.maintenance_retainer_standard.id
}

output "maintenance_retainer_premium_price_id" {
  description = "Maintenance Retainer Premium Price ID"
  value       = stripe_price.maintenance_retainer_premium.id
}

output "api_basic_price_id" {
  description = "API Basic Price ID"
  value       = stripe_price.api_basic.id
}

output "api_standard_price_id" {
  description = "API Standard Price ID"
  value       = stripe_price.api_standard.id
}

output "api_premium_price_id" {
  description = "API Premium Price ID"
  value       = stripe_price.api_premium.id
}

output "app_store_basic_price_id" {
  description = "App Store Basic Price ID"
  value       = stripe_price.app_store_basic.id
}

output "app_store_standard_price_id" {
  description = "App Store Standard Price ID"
  value       = stripe_price.app_store_standard.id
}

output "app_store_premium_price_id" {
  description = "App Store Premium Price ID"
  value       = stripe_price.app_store_premium.id
}

output "blog_cms_basic_price_id" {
  description = "Blog CMS Basic Price ID"
  value       = stripe_price.blog_cms_basic.id
}

output "blog_cms_standard_price_id" {
  description = "Blog CMS Standard Price ID"
  value       = stripe_price.blog_cms_standard.id
}

output "blog_cms_premium_price_id" {
  description = "Blog CMS Premium Price ID"
  value       = stripe_price.blog_cms_premium.id
}

output "i18n_basic_price_id" {
  description = "Internationalization Basic Price ID"
  value       = stripe_price.i18n_basic.id
}

output "i18n_standard_price_id" {
  description = "Internationalization Standard Price ID"
  value       = stripe_price.i18n_standard.id
}

output "i18n_premium_price_id" {
  description = "Internationalization Premium Price ID"
  value       = stripe_price.i18n_premium.id
}

output "sso_basic_price_id" {
  description = "SSO Basic Price ID"
  value       = stripe_price.sso_basic.id
}

output "sso_standard_price_id" {
  description = "SSO Standard Price ID"
  value       = stripe_price.sso_standard.id
}

output "sso_premium_price_id" {
  description = "SSO Premium Price ID"
  value       = stripe_price.sso_premium.id
}
