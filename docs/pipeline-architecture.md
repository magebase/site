# Pipeline Architecture

This repository uses a **separated pipeline architecture** to handle infrastructure and application deployments independently.

## 📋 Pipeline Overview

### 1. Infrastructure Pipeline (`infrastructure.yml`)

**Purpose**: Manages infrastructure as code, Kubernetes manifests, and infrastructure deployments.

**Triggers**:

- Changes to `infra/`, `terraform/`, `k8s/` directories
- Manual workflow dispatch with environment and action selection

**Jobs**:

- **Validate**: Terraform validation, formatting, and security scanning
- **Terraform**: Plan/Apply/Destroy infrastructure changes
- **Kubernetes**: Deploy Kubernetes manifests and sync ArgoCD applications
- **Security Scan**: Infrastructure security scanning
- **Notify**: Deployment notifications and summaries

**Use Cases**:

- Database schema changes
- Kubernetes configuration updates
- Network infrastructure modifications
- Security policy updates
- Environment provisioning/destruction

### 2. Application Pipeline (`application.yml`)

**Purpose**: Handles Rails application code, testing, building, and deployment.

**Triggers**:

- Changes to application code (`app/`, `config/`, `Gemfile*`, etc.)
- Manual workflow dispatch with version specification

**Jobs**:

- **Test**: Ruby tests, system tests, JavaScript tests, security scans
- **Build**: Docker image building and pushing to GHCR
- **Deploy**: Update Kubernetes manifests and sync via ArgoCD
- **Security Scan**: Container image vulnerability scanning
- **Performance Test**: Lighthouse performance testing
- **Notify**: Deployment notifications and summaries

**Use Cases**:

- Feature development and deployment
- Bug fixes and hotfixes
- Dependency updates
- Configuration changes
- Performance optimizations

### 3. CI/CD Pipeline (`ci-cd.yml`)

**Purpose**: Comprehensive CI pipeline for general development workflow.

**Triggers**:

- All pushes and pull requests to main branch
- Manual workflow dispatch

**Jobs**:

- **Test**: Full test suite execution
- **Build**: Docker image creation
- **Deploy**: GitOps deployment trigger
- **Security Scan**: Container security scanning
- **Notify**: Deployment status notifications

## 🔄 Workflow Interactions

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Developer     │────│  Git Push/PR     │────│   CI/CD         │
│   Changes       │    │                  │    │   Pipeline      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                       │
         │                        │                       │
         ├────────────────────────┼───────────────────────┤
         │                        │                       │
         ▼                        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Infrastructure  │    │   Application     │    │   ArgoCD        │
│   Pipeline      │    │   Pipeline        │    │   Sync          │
│                 │    │                   │    │                 │
│ • Terraform     │    │ • Rails Tests     │    │ • Auto-sync     │
│ • K8s Manifests │    │ • Docker Build    │    │ • Health Checks │
│ • ArgoCD Apps   │    │ • Image Push      │    │ • Rollbacks     │
│ • Security      │    │ • Deploy          │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Deployment Strategies

### Infrastructure Changes

```bash
# Manual deployment with approval
gh workflow run infrastructure.yml \
  -f environment=prod \
  -f action=apply
```

### Application Deployment

```bash
# Deploy specific version
gh workflow run application.yml \
  -f environment=prod \
  -f version=v1.2.3
```

### Automated Deployments

- **Main branch pushes**: Automatic deployment to dev environment
- **Tagged releases**: Deployment to staging/production with approval
- **Hotfixes**: Direct deployment to production with emergency procedures

## 🔒 Security & Compliance

### Infrastructure Security

- **Checkov**: Terraform security scanning
- **Trivy**: Infrastructure configuration scanning
- **Manual Approvals**: Required for production infrastructure changes

### Application Security

- **Brakeman**: Rails security scanning
- **Bundle Audit**: Dependency vulnerability checking
- **Trivy**: Container image scanning
- **CodeQL**: Code security analysis

## 📊 Monitoring & Observability

### Infrastructure Monitoring

- Terraform state drift detection
- Kubernetes resource monitoring
- ArgoCD application health checks
- Cloudflare analytics and security events

### Application Monitoring

- Rails application performance
- Database query monitoring
- Error tracking and alerting
- User experience monitoring

## 🛠️ Maintenance & Operations

### Regular Tasks

- **Weekly**: Security scan reviews and updates
- **Monthly**: Dependency updates and infrastructure audits
- **Quarterly**: Performance reviews and optimizations

### Emergency Procedures

- **Rollback**: ArgoCD rollback capabilities
- **Hotfix**: Expedited deployment process for critical fixes
- **Incident Response**: Dedicated incident response workflows

## 📚 Best Practices

### Development Workflow

1. **Feature Development**: Use feature branches with PRs
2. **Infrastructure Changes**: Test in dev environment first
3. **Application Changes**: Ensure comprehensive test coverage
4. **Security Updates**: Immediate deployment with priority

### Deployment Checklist

- [ ] Tests passing in CI/CD pipeline
- [ ] Security scans completed successfully
- [ ] Manual review completed for production changes
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Communication plan ready

This separated architecture provides better isolation, security, and maintainability for infrastructure and application deployments.
