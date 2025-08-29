class Tenant::DocumentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tenant

  def index
    @documents = @tenant.documents.order(created_at: :desc)
  end

  def new
    @document = @tenant.documents.new
  end

  def create
    @document = @tenant.documents.new(document_params)
    @document.user = current_user

    if @document.save
      redirect_to tenant_documents_path, notice: "Document was successfully uploaded."
    else
      render :new
    end
  end

  def show
    @document = @tenant.documents.find(params[:id])
  end

  def destroy
    @document = @tenant.documents.find(params[:id])
    @document.destroy
    redirect_to tenant_documents_path, notice: "Document was successfully deleted."
  end

  private

  def set_tenant
    @tenant = current_user.tenants.find_by(subdomain: request.subdomain)
    unless @tenant
      redirect_to root_path, alert: "Tenant not found"
    end
  end

  def document_params
    params.require(:document).permit(:name, :file_path, :file_type)
  end
end
