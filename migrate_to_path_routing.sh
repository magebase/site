#!/bin/bash

# Rails Application Migration Script for Path-Based Tenant Routing
# This script helps migrate from subdomain-based to path-based tenant routing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a Rails project
check_rails_project() {
    if [ ! -f "config/routes.rb" ] || [ ! -f "Gemfile" ]; then
        print_error "This doesn't appear to be a Rails project. Please run this script from the Rails root directory."
        exit 1
    fi
    print_success "Rails project detected"
}

# Backup current routes
backup_routes() {
    print_status "Creating backup of current routes.rb..."
    cp config/routes.rb config/routes.rb.backup.$(date +%Y%m%d_%H%M%S)
    print_success "Routes backup created"
}

# Update routes.rb (already done in previous step)
update_routes() {
    print_status "Routes.rb has been updated to use path-based routing"
    print_success "Path-based tenant routing configured"
}

# Create database migration for tenant path support
create_migration() {
    print_status "Creating database migration for tenant path support..."

    timestamp=$(date +%Y%m%d%H%M%S)
    migration_file="db/migrate/${timestamp}_add_path_to_tenants.rb"

    cat > "$migration_file" << 'EOF'
class AddPathToTenants < ActiveRecord::Migration[8.1]
  def change
    # Add path column for path-based routing
    add_column :tenants, :path, :string
    add_index :tenants, :path, unique: true

    # Migrate existing subdomain data to path
    reversible do |dir|
      dir.up do
        Tenant.where.not(subdomain: nil).find_each do |tenant|
          tenant.update(path: tenant.subdomain)
        end
      end
    end

    # Add validation (optional - can be done in model)
    # Tenant.where(path: nil).update_all("path = subdomain")
  end
end
EOF

    print_success "Migration created: $migration_file"
}

# Update Tenant model
update_tenant_model() {
    print_status "Checking Tenant model..."

    if [ -f "app/models/tenant.rb" ]; then
        print_status "Updating Tenant model to support path-based routing..."

        # Add path validation and methods to Tenant model
        cat >> "app/models/tenant.rb" << 'EOF'

  # Path-based routing support
  validates :path, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_-]+\z/ }
  before_validation :set_path_from_name, if: -> { path.blank? && name.present? }

  private

  def set_path_from_name
    self.path = name.parameterize
  end
EOF

        print_success "Tenant model updated"
    else
        print_warning "Tenant model not found. Please create it manually."
    fi
}

# Update frontend components
update_frontend() {
    print_status "Checking for frontend tenant routing updates needed..."

    # Look for any hardcoded subdomain references in frontend
    if [ -d "app/frontend" ]; then
        print_status "Searching for subdomain references in frontend code..."

        # Search for subdomain references
        subdomain_refs=$(find app/frontend -name "*.tsx" -o -name "*.ts" -o -name "*.js" | xargs grep -l "subdomain" 2>/dev/null || true)

        if [ -n "$subdomain_refs" ]; then
            print_warning "Found subdomain references in frontend files:"
            echo "$subdomain_refs"
            print_warning "Please update these files to use path-based routing"
        else
            print_success "No subdomain references found in frontend"
        fi
    fi
}

# Create helper methods for path-based routing
create_helpers() {
    print_status "Creating helper methods for path-based tenant routing..."

    helper_file="app/helpers/tenant_helper.rb"

    cat > "$helper_file" << 'EOF'
module TenantHelper
  # Generate path for tenant
  def tenant_path(tenant, path = "")
    "/#{tenant.path}#{path}"
  end

  # Generate URL for tenant
  def tenant_url(tenant, path = "")
    "#{request.protocol}#{request.host_with_port}#{tenant_path(tenant, path)}"
  end

  # Get current tenant from path
  def current_tenant_from_path
    tenant_name = params[:tenant_name]
    return nil unless tenant_name.present?

    Tenant.find_by(path: tenant_name) || Tenant.find_by(name: tenant_name)
  end
end
EOF

    print_success "Tenant helper created: $helper_file"
}

# Run database migration
run_migration() {
    print_status "Running database migration..."

    if [ -f "bin/rails" ]; then
        ./bin/rails db:migrate
        print_success "Migration completed"
    else
        print_warning "Rails binary not found. Please run 'rails db:migrate' manually"
    fi
}

# Main migration function
main() {
    print_status "Starting Rails migration to path-based tenant routing"

    check_rails_project
    backup_routes
    update_routes
    create_migration
    update_tenant_model
    create_helpers
    update_frontend

    print_success "Migration preparation completed!"
    print_status "Next steps:"
    echo "1. Review the generated migration file"
    echo "2. Run the database migration: rails db:migrate"
    echo "3. Update any frontend code that references subdomains"
    echo "4. Test the path-based routing: /tenant-name/dashboard"
    echo "5. Update any external links or documentation"
}

# Run main function
main "$@"
