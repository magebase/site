#!/bin/bash

echo "Comprehensive SSL Certificate Fix Monitor"
echo "========================================"
echo "Target: argocd.dev.magebase.dev"
echo "Started: $(date)"
echo ""

# Counter for checks
CHECK_COUNT=0
MAX_CHECKS=20  # 10 minutes max

while [ $CHECK_COUNT -lt $MAX_CHECKS ]; do
    CHECK_COUNT=$((CHECK_COUNT + 1))

    echo "Check #$CHECK_COUNT at $(date '+%H:%M:%S')"
    echo "----------------------------------------"

    # Check current certificate
    CERT_INFO=$(echo | timeout 10 openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 2>/dev/null | openssl x509 -noout -subject -issuer 2>/dev/null)

    echo "Current certificate: $CERT_INFO"

    # Check for DNS challenge records
    TXT_RECORDS=$(dig TXT _acme-challenge.argocd.dev.magebase.dev @8.8.8.8 +short 2>/dev/null)
    if [ -n "$TXT_RECORDS" ]; then
        echo "🔍 DNS challenge TXT records found:"
        echo "$TXT_RECORDS"
    else
        echo "❌ No DNS challenge TXT records found"
    fi

    # Check if Let's Encrypt certificate is active
    if [[ $CERT_INFO == *"Let's Encrypt"* ]] || [[ $CERT_INFO == *"R3"* ]] || [[ $CERT_INFO != *"TRAEFIK DEFAULT CERT"* ]]; then
        echo ""
        echo "🎉 SUCCESS! SSL Certificate has been updated!"
        echo "Certificate details: $CERT_INFO"
        echo ""
        echo "Testing browser access..."

        # Test HTTPS access
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://argocd.dev.magebase.dev/ --max-time 10)
        echo "HTTPS Status: $HTTP_STATUS"

        echo ""
        echo "✅ ArgoCD should now be accessible with a valid SSL certificate at:"
        echo "   https://argocd.dev.magebase.dev"
        echo ""
        echo "SSL certificate fix completed successfully at $(date)"
        exit 0
    fi

    echo "Status: Still using Traefik default certificate, waiting..."
    echo ""

    if [ $CHECK_COUNT -lt $MAX_CHECKS ]; then
        sleep 30
    fi
done

echo ""
echo "⚠️  SSL certificate has not updated after $((MAX_CHECKS * 30 / 60)) minutes."
echo "   This may indicate an issue with:"
echo "   - Cloudflare API token permissions"
echo "   - DNS zone configuration"
echo "   - cert-manager configuration"
echo "   - Let's Encrypt rate limits"
echo ""
echo "Current certificate: $CERT_INFO"
echo ""
echo "Next steps:"
echo "1. Check GitHub Actions for deployment status"
echo "2. Verify Cloudflare API token has DNS edit permissions"
echo "3. Check cert-manager logs (if cluster access available)"
echo "4. Consider using staging issuer for debugging"
