         │                        │                       │
         │                        │                       │
         │                        │                       │
         ├────────────────────────┼───────────────────────┤
         ▼                        ▼                       ▼
      -f action=apply
      -f environment=prod \
      -f environment=prod \
      -f version=v1.2.3
   This repository uses a **separated pipeline architecture** to handle infrastructure and application deployments independently.
   This separated architecture provides better isolation, security, and maintainability for infrastructure and application deployments.
# Deploy specific version
# Manual deployment with approval
# Pipeline Architecture
## 📊 Monitoring & Observability
## 📋 Pipeline Overview
## 📚 Best Practices
## 🔄 Workflow Interactions
## 🔒 Security & Compliance
## 🚀 Deployment Strategies
## 🛠️ Maintenance & Operations
### 1. Infrastructure Pipeline (`infrastructure.yml`)
### 1.5. AWS Organizations & SSO Pipeline (`sso-management.yml`)
### 2. Application Pipeline (`application.yml`)
### 3. CI/CD Pipeline (`ci-cd.yml`)
### Application Deployment
### Application Monitoring
### Application Security
### Automated Deployments
### Deployment Checklist
### Development Workflow
### Emergency Procedures
### Infrastructure Changes
### Infrastructure Monitoring
### Infrastructure Security
### Regular Tasks
**Jobs**:
**Jobs**:
**Jobs**:
**Jobs**:
**Purpose**: Comprehensive CI pipeline for general development workflow.
**Purpose**: Handles Rails application code, testing, building, and deployment.
**Purpose**: Manages AWS Organizations accounts and AWS SSO/IAM Identity Center configuration.
**Purpose**: Manages infrastructure as code, Kubernetes manifests, and infrastructure deployments.
**Triggers**:
**Triggers**:
**Triggers**:
**Triggers**:
**Use Cases**:
**Use Cases**:
**Use Cases**:
- **Brakeman**: Rails security scanning
- **Build**: Docker image building and pushing to GHCR
- **Build**: Docker image creation
- **Bundle Audit**: Dependency vulnerability checking
- **Checkov**: Terraform security scanning
- **CodeQL**: Code security analysis
- **Deploy**: GitOps deployment trigger
- **Deploy**: Update Kubernetes manifests and sync via ArgoCD
- **Hotfix**: Expedited deployment process for critical fixes
- **Hotfixes**: Direct deployment to production with emergency procedures
- **Incident Response**: Dedicated incident response workflows
- **Kubernetes**: Deploy Kubernetes manifests and sync ArgoCD applications
- **Main branch pushes**: Automatic deployment to dev environment
- **Manual Approvals**: Required for production infrastructure changes
- **Monthly**: Dependency updates and infrastructure audits
- **Notify**: Deployment notifications and summaries
- **Notify**: Deployment notifications and summaries
- **Notify**: Deployment results with account IDs and SSO status
- **Notify**: Deployment status notifications
- **Performance Test**: Lighthouse performance testing
- **Quarterly**: Performance reviews and optimizations
- **Rollback**: ArgoCD rollback capabilities
- **Security Scan**: Container image vulnerability scanning
- **Security Scan**: Container security scanning
- **Security Scan**: Infrastructure security scanning
- **Tagged releases**: Deployment to staging/production with approval
- **Terraform**: Plan/Apply AWS Organizations and SSO configuration
- **Terraform**: Plan/Apply/Destroy infrastructure changes
- **Test**: Full test suite execution
- **Test**: Ruby tests, system tests, JavaScript tests, security scans
- **Trivy**: Container image scanning
- **Trivy**: Infrastructure configuration scanning
- **Validate**: AWS credentials, organization status, and prerequisites
- **Validate**: Terraform validation, formatting, and security scanning
- **Verify**: Account creation validation and SSO assignment confirmation
- **Weekly**: Security scan reviews and updates
- AWS account creation and management
- All pushes and pull requests to main branch
- ArgoCD application health checks
- Bug fixes and hotfixes
- Changes to `infra/`, `terraform/`, `k8s/` directories
- Changes to `infra/organizations/`, `infra/sso/`, `infra/main.tf` directories
- Changes to application code (`app/`, `config/`, `Gemfile*`, etc.)
- Cloudflare analytics and security events
- Configuration changes
- Database query monitoring
- Database schema changes
- Dependency updates
- Environment provisioning/destruction
- Error tracking and alerting
- Feature development and deployment
- Identity center setup
- Kubernetes configuration updates
- Kubernetes resource monitoring
- Manual workflow dispatch
- Manual workflow dispatch
- Manual workflow dispatch with environment and action selection
- Manual workflow dispatch with version specification
- Multi-account access control
- Network infrastructure modifications
- Performance optimizations
- Rails application performance
- SSO permission set configuration
- Security policy updates
- Terraform state drift detection
- User experience monitoring
- User group management
- [ ] Communication plan ready
- [ ] Manual review completed for production changes
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented
- [ ] Security scans completed successfully
- [ ] Tests passing in CI/CD pipeline
1. **Feature Development**: Use feature branches with PRs
2. **Infrastructure Changes**: Test in dev environment first
3. **Application Changes**: Ensure comprehensive test coverage
4. **Security Updates**: Immediate deployment with priority
```
```
```
```
```
```
`````
`````
````bash
```bash
```text
gh workflow run application.yml \
gh workflow run infrastructure.yml \
│                 │    │                   │    │                   │    │                 │
│   Changes       │    │                  │    │   Pipeline      │
│   Creation      │    │ • K8s Manifests   │    │ • Docker Build    │    │ • Health Checks │
│   Developer     │────│  Git Push/PR     │────│   CI/CD         │
│   Pipeline      │    │   Pipeline        │    │   Pipeline        │    │   Sync          │
│ AWS Org & SSO   │    │ Infrastructure    │    │   Application     │    │   ArgoCD        │
│ • Account       │    │ • Terraform       │    │ • Rails Tests     │    │ • Auto-sync     │
│ • Permissions   │    │ • Security        │    │ • Deploy          │    │                 │
│ • SSO Setup     │    │ • ArgoCD Apps     │    │ • Image Push      │    │ • Rollbacks     │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌─────────────────┐
└─────────────────┘    └──────────────────┘    └───────────────────┘    └─────────────────┘
└─────────────────┘    └──────────────────┘    └─────────────────┘
