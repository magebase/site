  ./k8s/deploy.sh -e dev
  ./k8s/deploy.sh -e prod -t v1.0.0
  Successfully migrated Magebase from AWS to Hetzner Cloud + k3s clusters with comprehensive GitOps deployment setup.
  The infrastructure migration is complete and ready for production deployment! 🎉
# Access at http://localhost:3000
# Copy environment template
# Deploy k3s clusters to Hetzner
# Deploy to development
# Deploy to production
# Edit with your actual values
# Get Grafana admin password
# Magebase Infrastructure Migration - COMPLETED ✅
# Port forward Grafana
## Summary
## ✅ Completed Components
## 📁 File Structure Created
## 📈 Performance Optimizations
## 📊 Resource Requirements
## 🔒 Security Considerations
## 🔧 Key Features
## 🚀 Next Steps
### 1. Environment Setup
### 1. Infrastructure Migration
### 2. Deploy Infrastructure
### 2. Kubernetes Application Deployment
### 3. Configure DNS
### 3. Database & Caching
### 4. Deploy Application
### 4. Monitoring & Observability
### 5. Access Services
### 5. GitOps & CI/CD
### 6. Documentation & Tooling
### Development Environment
### Production Environment
- **AWS SES**: Maintained email service integration
- **Application**: 1 pod, 256Mi-512Mi RAM, 100-200m CPU
- **Application**: 3 pods, 1-2Gi RAM, 500-1000m CPU
- **ArgoCD**: GitOps continuous delivery platform
- **Automated Backups**: Daily PostgreSQL backups to AWS S3
- **Automated Backups**: Daily PostgreSQL backups to S3
- **Automated Deployments**: GitHub Actions workflow for CI/CD
- **Base Manifests**: Complete application, database, and Redis configurations
- **CloudNativePG Monitoring**: Database metrics collection
- **Cloudflare DNS**: Free plan integration with magebase.dev domain
- **Comprehensive README**: Complete deployment and troubleshooting guide
- **Cost Optimized**: Hetzner Cloud provides significant cost savings vs AWS
- **Database**: 1 PostgreSQL instance, 5Gi storage
- **Database**: 3 PostgreSQL instances (HA), 50Gi storage
- **Deployment Script**: Automated build, push, and deploy process
- **Deployment Script**: Automated deployment with health verification
- **Environment Management**: Separate dev/prod namespaces and configurations
- **Environment Overlays**: Dev and production-specific resource allocations
- **Environment Setup**: Dev (1 node each) and Prod (3 nodes HA) configurations
- **Environment Template**: Sample .env file with all required variables
- **GitOps Ready**: ArgoCD configured for continuous deployment
- **Health Checks**: Custom Rails health controller with database/Redis monitoring
- **Health Monitoring**: Application and infrastructure health checks
- **Health Monitoring**: Comprehensive health checks for all services
- **Hetzner Cloud**: k3s clusters in US regions (Ashburn VA for prod, Hillsboro OR for dev)
- **High Availability**: Production setup with 3-node k3s cluster
- **Ingress Configuration**: Nginx ingress with TLS termination
- **Kubernetes Dashboard**: Web-based cluster management
- **Logging**: Loki for log aggregation
- **Observability**: Full monitoring stack with Prometheus/Grafana
- **PostgreSQL**: CloudNativePG operator with HA setup for production
- **Redis**: 1 instance, 5Gi storage
- **Redis**: 2 instances for redundancy
- **Redis**: Persistent Redis deployment with failover
- **Resource Optimization**: Environment-specific storage and compute resources
- **Scalability**: Horizontal pod autoscaling ready
- **Secrets Management**: Kubernetes secrets with base64 encoded values
- **Security**: TLS encryption, secrets management, network policies
- **Terraform Configuration**: Complete rewrite using terraform-hcloud-kube-hetzner v2.18.1
- **kube-prometheus-stack**: Prometheus, Grafana, AlertManager
- AWS SES integration maintained for email services
- All secrets stored as Kubernetes secrets
- Database connections use internal networking
- Health checks for automated recovery
- Network policies implemented for pod communication
- Nginx ingress with optimized configurations
- Point A/AAAA records to Hetzner load balancer IPs
- PostgreSQL parameters tuned for workload
- Redis persistence with failover
- Resource limits and requests properly configured
- TLS certificates managed by cert-manager
- Update Cloudflare DNS records for your domain
```
```
```
```
```
```
```
```
```
```
````
````bash
```bash
```bash
```bash
cd terraform
cp k8s/.env.example .env
k8s/
kubectl get secret -n monitoring kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80 -n monitoring
nano .env
terraform apply -var-file=dev.tfvars
terraform init
terraform plan -var-file=dev.tfvars
│       └── prod-patches.yaml     # Prod resource limits
│       ├── kustomization.yaml
│   │   └── dev-patches.yaml      # Dev resource limits
│   │   ├── kustomization.yaml
│   └── kustomization.yaml        # Base configuration
│   └── prod/                     # Production environment
│   ├── database.yaml             # PostgreSQL cluster (CloudNativePG)
│   ├── deployment.yaml           # Rails application deployment
│   ├── dev/                      # Development environment
│   ├── redis.yaml                # Redis cache deployment
└── README.md                     # Comprehensive documentation
├── .env.example                  # Environment variables template
├── base/                          # Base Kubernetes manifests
├── deploy.sh                     # Automated deployment script
├── overlays/                     # Environment-specific overlays
