class Tenant::DocumentsController < ApplicationController
  include TenantPath  # Changed from TenantSubdomain to TenantPath
  before_action :authenticate_user!

  def index
    documents = current_tenant.documents.order(created_at: :desc)

    render inertia: 'Tenant/Documents/Index', props: {
      tenant: current_tenant.as_json(only: [:name, :subdomain]),
      documents: documents.as_json(include: :user)
    }
  end

  def new
    document = current_tenant.documents.new

    render inertia: 'Tenant/Documents/New', props: {
      tenant: current_tenant.as_json(only: [:name, :subdomain]),
      document: document.as_json
    }
  end

  def create
    document = current_tenant.documents.new(document_params)
    document.user = current_user

    if document.save
      redirect_to tenant_documents_path, notice: 'Document was successfully uploaded.'
    else
      render inertia: 'Tenant/Documents/New', props: {
        tenant: current_tenant.as_json(only: [:name, :subdomain]),
        document: document.as_json,
        errors: document.errors.as_json
      }
    end
  end

  def show
    document = current_tenant.documents.find(params[:id])

    render inertia: 'Tenant/Documents/Show', props: {
      tenant: current_tenant.as_json(only: [:name, :subdomain]),
      document: document.as_json(include: :user)
    }
  end

  def destroy
    document = current_tenant.documents.find(params[:id])
    document.destroy
    redirect_to tenant_documents_path, notice: 'Document was successfully deleted.'
  end

  private

  def document_params
    params.require(:document).permit(:name, :file_path, :file_type)
  end
end
