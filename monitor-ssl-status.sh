#!/bin/bash

# SSL Certificate Status Monitor
# This script monitors the ArgoCD SSL certificate status after deployment

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== ArgoCD SSL Certificate Status Monitor ===${NC}"

# Configuration
DOMAIN="argocd.dev.magebase.dev"
MAX_RETRIES=30
RETRY_INTERVAL=30

check_certificate() {
    local domain="$1"
    echo -e "${YELLOW}Checking certificate for: $domain${NC}"

    # Get certificate details
    local cert_info
    if cert_info=$(echo | timeout 10 openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -subject -issuer -dates 2>/dev/null); then
        echo "$cert_info"

        # Check if it's still the default Traefik certificate
        if echo "$cert_info" | grep -q "CN=TRAEFIK DEFAULT CERT"; then
            echo -e "${RED}❌ Still using Traefik default certificate${NC}"
            return 1
        else
            echo -e "${GREEN}✅ Valid certificate found!${NC}"
            return 0
        fi
    else
        echo -e "${RED}❌ Failed to retrieve certificate${NC}"
        return 1
    fi
}

check_http_response() {
    local domain="$1"
    echo -e "${YELLOW}Checking HTTP response...${NC}"

    local status_code
    if status_code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 "https://$domain" 2>/dev/null); then
        case $status_code in
            200|302|307)
                echo -e "${GREEN}✅ HTTP response: $status_code (Good)${NC}"
                return 0
                ;;
            *)
                echo -e "${YELLOW}⚠️  HTTP response: $status_code${NC}"
                return 1
                ;;
        esac
    else
        echo -e "${RED}❌ Failed to get HTTP response${NC}"
        return 1
    fi
}

monitor_deployment() {
    echo -e "${BLUE}Starting certificate monitoring...${NC}"
    echo -e "${YELLOW}Domain: $DOMAIN${NC}"
    echo -e "${YELLOW}Max retries: $MAX_RETRIES${NC}"
    echo -e "${YELLOW}Check interval: ${RETRY_INTERVAL}s${NC}"
    echo ""

    local retry=0
    local start_time=$(date +%s)

    while [ $retry -lt $MAX_RETRIES ]; do
        local current_time=$(date +%s)
        local elapsed=$((current_time - start_time))

        echo -e "${BLUE}--- Check $((retry + 1))/$MAX_RETRIES (${elapsed}s elapsed) ---${NC}"

        if check_certificate "$DOMAIN"; then
            echo ""
            check_http_response "$DOMAIN"
            echo ""
            echo -e "${GREEN}🎉 SUCCESS: SSL certificate has been updated!${NC}"
            echo -e "${GREEN}ArgoCD should now be accessible with a valid certificate.${NC}"
            echo -e "${YELLOW}URL: https://$DOMAIN${NC}"
            return 0
        fi

        retry=$((retry + 1))
        if [ $retry -lt $MAX_RETRIES ]; then
            echo -e "${YELLOW}Waiting ${RETRY_INTERVAL}s before next check...${NC}"
            echo ""
            sleep $RETRY_INTERVAL
        fi
    done

    echo -e "${RED}❌ TIMEOUT: Certificate was not updated after $((MAX_RETRIES * RETRY_INTERVAL))s${NC}"
    return 1
}

show_next_steps() {
    echo ""
    echo -e "${BLUE}=== Next Steps ===${NC}"
    echo ""
    echo -e "${YELLOW}If the certificate is not updated:${NC}"
    echo "1. Check GitHub Actions workflow status:"
    echo "   https://github.com/magebase/site/actions"
    echo ""
    echo "2. If you have cluster access, check cert-manager logs:"
    echo "   kubectl logs -n cert-manager -l app=cert-manager"
    echo ""
    echo "3. Check certificate status:"
    echo "   kubectl get certificates -n argocd"
    echo "   kubectl describe certificate argocd-tls -n argocd"
    echo ""
    echo "4. Check ACME challenges:"
    echo "   kubectl get challenges -n argocd"
    echo "   kubectl describe challenges -n argocd"
    echo ""
    echo -e "${YELLOW}Manual verification commands:${NC}"
    echo "• Test SSL: openssl s_client -servername $DOMAIN -connect $DOMAIN:443"
    echo "• Check DNS: nslookup $DOMAIN"
    echo "• Test HTTP: curl -I https://$DOMAIN"
    echo ""
    echo -e "${YELLOW}Expected timeline:${NC}"
    echo "• Infrastructure deployment: 5-10 minutes"
    echo "• Certificate issuance: 2-5 minutes"
    echo "• DNS propagation: 1-2 minutes"
    echo "• Total expected time: 10-15 minutes"
}

# Main execution
echo -e "${YELLOW}Initial certificate status:${NC}"
check_certificate "$DOMAIN"
echo ""

monitor_deployment
exit_code=$?

show_next_steps

exit $exit_code
