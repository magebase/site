# Environment Promotion Workflow

This document describes the environment promotion system for the Magebase application.

## Overview

The environment promotion workflow enables controlled, staged deployment of releases through the environment pipeline: `dev` → `qa` → `uat` → `prod`.

## Workflow Features

### 🚀 Automated Promotion
- **Manual Trigger**: Environment promotions are manually initiated via GitHub Actions
- **Validation**: Ensures valid environment progression and release versions
- **PR Creation**: Automatically creates pull requests for environment promotions
- **GitOps Integration**: Updates Kubernetes configurations for target environments

### 🔒 Quality Gates
- **Environment Validation**: Only allows valid progressions (dev→qa, qa→uat, uat→prod)
- **Version Validation**: Ensures proper semantic versioning format (v1.2.3)
- **Branch Management**: Creates dedicated release branches for each promotion

### 📊 Environment URLs
The main deployment workflow now outputs URLs for all environments:
- **Dev**: https://dev.magebase.dev
- **QA**: https://qa.magebase.dev
- **UAT**: https://uat.magebase.dev
- **Prod**: https://magebase.dev

## How to Use

### 1. Trigger Environment Promotion

1. Go to **Actions** tab in GitHub
2. Select **"Environment Promotion Pipeline"** workflow
3. Click **"Run workflow"**
4. Fill in the parameters:
   - **Source Environment**: Environment to promote from
   - **Target Environment**: Environment to promote to
   - **Release Version**: Version to promote (e.g., v1.2.3)
   - **Create PR**: Whether to create a pull request (recommended)

### 2. Valid Environment Progressions

| From | To | Description |
|------|----|-------------|
| dev | qa | Development to Quality Assurance |
| qa | uat | Quality Assurance to User Acceptance Testing |
| uat | prod | User Acceptance Testing to Production |

### 3. Review and Approve

1. **PR Review**: Review the automatically created pull request
2. **Changes**: Verify Kubernetes configuration updates for the target environment
3. **Testing**: Ensure the source environment has passed all quality gates
4. **Approval**: Approve and merge the PR when ready

### 4. Deployment

Once the PR is merged, the main deployment workflow will:
1. Deploy the release to the target environment
2. Update the Kubernetes deployment with the correct image tag
3. Trigger ArgoCD synchronization

## Workflow Jobs

### 1. Validate Promotion
- Validates environment progression logic
- Checks release version format
- Creates release branch name

### 2. Create Release Branch
- Creates or checks out the release branch
- Prepares for configuration changes

### 3. Update K8s Configuration
- Creates environment-specific overlays if they don't exist
- Updates image tags in Kubernetes deployments
- Commits changes to the release branch

### 4. Create Promotion PR
- Creates a pull request for the promotion
- Includes deployment checklist and information
- Adds appropriate labels

### 5. Notify Promotion Status

- Provides summary of the promotion process
- Logs promotion status in GitHub Actions

## Environment Configurations

### Development (dev)
- **Replicas**: 1
- **Resources**: 256Mi RAM, 100m CPU
- **Storage**: 5Gi
- **Domain**: dev.magebase.dev

### Quality Assurance (qa)
- **Replicas**: 2
- **Resources**: 256Mi RAM, 100m CPU
- **Storage**: 10Gi
- **Domain**: qa.magebase.dev

### User Acceptance Testing (uat)
- **Replicas**: 2
- **Resources**: 512Mi RAM, 250m CPU
- **Storage**: 20Gi
- **Domain**: uat.magebase.dev

### Production (prod)
- **Replicas**: 3
- **Resources**: 1Gi RAM, 500m CPU
- **Storage**: 50Gi
- **Domain**: magebase.dev

## Troubleshooting

### Common Issues

1. **Invalid Environment Progression**
   - Ensure you're following the correct flow: dev → qa → uat → prod
   - Check that the source environment is correct

2. **Release Version Format**
   - Must follow semantic versioning: v{major}.{minor}.{patch}
   - Example: v1.2.3, v2.0.0

3. **Branch Conflicts**
   - If a release branch already exists, the workflow will use it
   - Manual resolution may be needed for conflicts

4. **PR Creation Fails**
   - Check if a PR already exists for the release branch
   - Ensure proper permissions for PR creation

### Manual Intervention

If automated promotion fails, you can:

1. **Manual K8s Update**: Update the deployment YAML directly
2. **Manual PR Creation**: Create PRs manually if workflow fails
3. **Rollback**: Use Git to revert changes if needed

## Security Considerations

- **Access Control**: Only authorized team members can trigger promotions
- **Audit Trail**: All promotions are tracked via GitHub Actions logs
- **Rollback Plan**: Each promotion creates a revertible commit
- **Secret Management**: Environment-specific secrets are managed via ESO

## Monitoring

- **GitHub Actions**: Monitor workflow runs and failures
- **ArgoCD**: Track deployment status and rollbacks
- **GitHub Notifications**: Receive real-time promotion updates via GitHub
- **Health Checks**: Verify deployments via environment URLs
