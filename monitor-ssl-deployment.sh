#!/bin/bash

echo "SSL Certificate Deployment Monitor"
echo "=================================="
echo "Monitoring: argocd.dev.magebase.dev"
echo "Started: $(date)"
echo ""

while true; do
    echo -n "$(date '+%H:%M:%S') - "

    CERT_INFO=$(echo | timeout 10 openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 2>/dev/null | openssl x509 -noout -subject -issuer 2>/dev/null)

    if [[ $CERT_INFO == *"TRAEFIK DEFAULT CERT"* ]]; then
        echo "Still using Traefik default certificate - deployment in progress..."
    elif [[ $CERT_INFO == *"Let's Encrypt"* ]]; then
        echo "🎉 SUCCESS! Let's Encrypt certificate is now active!"
        echo "Certificate details:"
        echo "$CERT_INFO"
        break
    else
        echo "Certificate status: $CERT_INFO"
    fi

    sleep 30
done

echo ""
echo "Deployment completed successfully at $(date)"
echo "ArgoCD should now be accessible with a valid SSL certificate at:"
echo "https://argocd.dev.magebase.dev"
