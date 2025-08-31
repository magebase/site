# AWS Account Discovery Script

# Run this to find your existing AWS account IDs
echo 'Finding AWS Organization accounts...'
aws organizations list-accounts --query 'Accounts[*].[Id,Name,Email]' --output table

echo ''
echo 'If you see your production account in the list above,'
echo 'copy its ID and update terraform.tfvars'
