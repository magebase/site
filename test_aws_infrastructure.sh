#!/bin/bash

# Test script for AWS infrastructure setup
# This script verifies that all AWS services are properly configured

set -e

echo "🔍 Testing AWS Infrastructure Setup"
echo "==================================="

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Get the current account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "📋 Current Account ID: $ACCOUNT_ID"

# Test Route 53 hosted zone
echo ""
echo "🌐 Testing Route 53 Hosted Zone..."
if aws route53 list-hosted-zones --query "HostedZones[?Name=='magebase.dev.']" --output text | grep -q magebase.dev; then
    echo "✅ Route 53 hosted zone exists"
else
    echo "❌ Route 53 hosted zone not found"
fi

# Test S3 bucket
echo ""
echo "📦 Testing S3 Bucket..."
if aws s3 ls s3://magebase-static-assets- 2>/dev/null | head -1 | grep -q magebase; then
    echo "✅ S3 bucket exists and is accessible"
else
    echo "❌ S3 bucket not found or not accessible"
fi

# Test CloudFront distribution
echo ""
echo "☁️  Testing CloudFront Distribution..."
if aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='magebase-static-assets']" --output text | grep -q magebase; then
    echo "✅ CloudFront distribution exists"
else
    echo "❌ CloudFront distribution not found"
fi

# Test WAF WebACL
echo ""
echo "🛡️  Testing WAF WebACL..."
if aws wafv2 list-web-acls --scope CLOUDFRONT --query "WebACLs[?Name=='magebase-waf']" --output text | grep -q magebase; then
    echo "✅ WAF WebACL exists"
else
    echo "❌ WAF WebACL not found"
fi

# Test RDS instance
echo ""
echo "🗄️  Testing RDS Instance..."
if aws rds describe-db-instances --db-instance-identifier magebase-postgres --query "DBInstances[0].DBInstanceStatus" --output text 2>/dev/null | grep -q available; then
    echo "✅ RDS instance exists and is available"
else
    echo "❌ RDS instance not found or not available"
fi

# Test SES domain identity
echo ""
echo "📧 Testing SES Domain Identity..."
if aws ses get-identity-verification-attributes --identities magebase.dev --query "VerificationAttributes.magebase.dev.VerificationStatus" --output text 2>/dev/null | grep -q Success; then
    echo "✅ SES domain identity is verified"
else
    echo "❌ SES domain identity not verified"
fi

echo ""
echo "🎉 Infrastructure test completed!"
echo "=================================="
echo "If all tests passed, your AWS infrastructure is properly configured."
echo "You can now deploy your Rails application using the provided outputs."
