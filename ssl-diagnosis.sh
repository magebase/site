#!/bin/bash

echo "Direct SSL Certificate Diagnosis"
echo "================================="
echo "Testing: argocd.dev.magebase.dev"
echo "Time: $(date)"
echo ""

echo "1. Testing DNS resolution:"
nslookup argocd.dev.magebase.dev
echo ""

echo "2. Testing HTTP connection (port 80):"
curl -I http://argocd.dev.magebase.dev/ --max-time 10
echo ""

echo "3. Testing HTTPS connection (port 443):"
curl -I https://argocd.dev.magebase.dev/ --max-time 10 --insecure
echo ""

echo "4. Detailed SSL certificate information:"
echo | openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 -verify_return_error 2>/dev/null | head -30
echo ""

echo "5. Certificate chain details:"
echo | openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 -showcerts 2>/dev/null | grep -E "(subject|issuer)="
echo ""

echo "6. Let's Encrypt acme-challenge test:"
echo "Checking if DNS challenge is working..."
dig TXT _acme-challenge.argocd.dev.magebase.dev +short
echo ""

echo "7. Check if ArgoCD is responding on HTTP:"
curl http://argocd.dev.magebase.dev/healthz --max-time 5 2>/dev/null && echo "ArgoCD HTTP health check: OK" || echo "ArgoCD HTTP health check: FAILED"

echo ""
echo "Diagnosis complete."
