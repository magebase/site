#!/bin/bash

echo "ArgoCD SSL Certificate - Staging Test Monitor"
echo "============================================="
echo "Target: argocd.dev.magebase.dev"
echo "Testing with Let's Encrypt Staging environment"
echo "Started: $(date)"
echo ""

for i in {1..10}; do
    echo "Check #$i at $(date '+%H:%M:%S')"
    echo "----------------------------------------"

    # Check current certificate
    CERT_INFO=$(echo | timeout 10 openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 2>/dev/null | openssl x509 -noout -subject -issuer 2>/dev/null)
    echo "Certificate: $CERT_INFO"

    # Check for DNS challenge records
    TXT_RECORDS=$(dig TXT _acme-challenge.argocd.dev.magebase.dev @8.8.8.8 +short 2>/dev/null | head -3)
    if [ -n "$TXT_RECORDS" ]; then
        echo "🔍 DNS challenge TXT records found:"
        echo "$TXT_RECORDS"
    else
        echo "❌ No DNS challenge TXT records"
    fi

    # Check if certificate changed from Traefik default
    if [[ $CERT_INFO != *"TRAEFIK DEFAULT CERT"* ]]; then
        echo ""
        echo "🎉 Certificate updated! Details:"
        echo "$CERT_INFO"

        if [[ $CERT_INFO == *"staging"* ]] || [[ $CERT_INFO == *"Fake"* ]]; then
            echo "✅ Staging certificate issued successfully!"
            echo "DNS challenges are working. Switching back to production issuer..."
            exit 0
        else
            echo "✅ Production certificate issued!"
            exit 0
        fi
    fi

    echo "Status: Still using Traefik default certificate"
    echo ""

    if [ $i -lt 10 ]; then
        sleep 30
    fi
done

echo ""
echo "⚠️  No certificate change detected after 5 minutes."
echo "This suggests an issue with cert-manager or Cloudflare configuration."
