# Cloudflare DNS Configuration Module
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

# Variables
variable "domain_name" {
  description = "Domain name to configure in Cloudflare"
  type        = string
}

variable "cluster_ipv4" {
  description = "IPv4 address of the cluster ingress"
  type        = string
}

variable "cluster_ipv6" {
  description = "IPv6 address of the cluster ingress"
  type        = string
  default     = null
}

# Data source to get the zone
data "cloudflare_zone" "main" {
  name = var.domain_name
}

# A record for the root domain
resource "cloudflare_record" "root_a" {
  zone_id = data.cloudflare_zone.main.id
  name    = var.domain_name
  content = var.cluster_ipv4
  type    = "A"
  ttl     = 300
  proxied = true
}

# AAAA record for the root domain (if IPv6 is provided)
resource "cloudflare_record" "root_aaaa" {
  count   = var.cluster_ipv6 != null ? 1 : 0
  zone_id = data.cloudflare_zone.main.id
  name    = var.domain_name
  content = var.cluster_ipv6
  type    = "AAAA"
  ttl     = 300
  proxied = true
}

# CNAME record for www subdomain
resource "cloudflare_record" "www_cname" {
  zone_id = data.cloudflare_zone.main.id
  name    = "www"
  content = var.domain_name
  type    = "CNAME"
  ttl     = 300
  proxied = true
}

# Outputs
output "zone_id" {
  value = data.cloudflare_zone.main.id
}

output "name_servers" {
  value = data.cloudflare_zone.main.name_servers
}
