# Terraform configuration for Magebase infrastructure using Hetzner + k3s
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = ">= 1.51.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Hetzner Cloud Provider
provider "hcloud" {
  token = var.hcloud_token
}

# Cloudflare Provider
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# AWS Provider (for SES only)
provider "aws" {
  alias  = "ses"
  region = "ap-southeast-1"  # Singapore region for SES
  assume_role {
    role_arn = "arn:aws:iam::${var.aws_ses_account_id}:role/SESManagerRole"
  }
}

# Local values
locals {
  cluster_name = "${var.environment}-magebase"
  singapore_locations = ["sin"]  # Singapore location
  location     = "sin"  # Singapore for all environments
}

# K3s Cluster Module
module "k3s_cluster" {
  source  = "kube-hetzner/kube-hetzner/hcloud"
  version = "2.18.1"

  providers = {
    hcloud = hcloud
  }

  # Cluster configuration
  cluster_name = local.cluster_name

  # Hetzner Cloud configuration
  hcloud_token = var.hcloud_token

  # Network configuration
  network_region = "ap-southeast"  # Singapore network region
  network_ipv4_cidr = "10.0.0.0/8"
  cluster_ipv4_cidr = "10.42.0.0/16"
  service_ipv4_cidr = "10.43.0.0/16"

  # DNS servers
  dns_servers = [
    "1.1.1.1",
    "8.8.8.8",
    "2606:4700:4700::1111"
  ]

  # SSH configuration
  ssh_public_key  = file("~/.ssh/id_ed25519.pub")
  ssh_private_key = file("~/.ssh/id_ed25519")

  # Control plane configuration
  control_plane_nodepools = [
    {
      name        = "control-plane-${local.location}"
      server_type = var.environment == "prod" ? "cpx31" : "cpx21"
      location    = local.location
      labels      = []
      taints      = []
      count       = var.environment == "prod" ? 3 : 1
    }
  ]

  # Agent node pools
  agent_nodepools = [
    {
      name        = "agent-${local.location}"
      server_type = var.environment == "prod" ? "cpx31" : "cpx21"
      location    = local.location
      labels      = []
      taints      = []
      count       = var.environment == "prod" ? 3 : 1
    }
  ]

  # Load balancer configuration
  load_balancer_type     = var.environment == "prod" ? "lb21" : "lb11"
  load_balancer_location = local.location

  # CNI configuration
  cni_plugin = "cilium"

  # Cilium configuration
  cilium_routing_mode = "native"
  cilium_ipv4_native_routing_cidr = "10.0.0.0/8"
  cilium_egress_gateway_enabled = true
  cilium_hubble_enabled = true

  # Ingress controller
  ingress_controller = "nginx"

  # Enable required components
  enable_cert_manager = true
  enable_metrics_server = true

  # Allow scheduling on control plane for smaller clusters
  allow_scheduling_on_control_plane = var.environment == "dev"

  # Firewall configuration
  block_icmp_ping_in = false
  firewall_kube_api_source = ["0.0.0.0/0", "::/0"]
  firewall_ssh_source = ["0.0.0.0/0", "::/0"]

  # K3s configuration
  initial_k3s_channel = "stable"
  automatically_upgrade_k3s = true
  automatically_upgrade_os = true

  # Extra manifests for additional components
  extra_kustomize_folder = "extra-manifests"
  extra_kustomize_parameters = {
    environment = var.environment
    domain      = var.domain_name
  }
}

# Cloudflare DNS Configuration
module "cloudflare_dns" {
  source = "./modules/cloudflare"

  domain_name = var.domain_name
  cluster_ipv4 = module.k3s_cluster.ingress_public_ipv4
  cluster_ipv6 = module.k3s_cluster.ingress_public_ipv6
}

# AWS SES Configuration (kept from old infrastructure)
module "aws_ses" {
  source = "./modules/aws-ses"
  providers = {
    aws = aws.ses
  }

  domain_name = var.domain_name
  environment = var.environment
}

# Outputs
output "kubeconfig" {
  value     = module.k3s_cluster.kubeconfig
  sensitive = true
}

output "cluster_name" {
  value = local.cluster_name
}

output "ingress_ipv4" {
  value = module.k3s_cluster.ingress_public_ipv4
}

output "ingress_ipv6" {
  value = module.k3s_cluster.ingress_public_ipv6
}

output "cloudflare_zone_id" {
  value = module.cloudflare_dns.zone_id
}
