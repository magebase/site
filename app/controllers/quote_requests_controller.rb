class QuoteRequestsController < ApplicationController
  def create
    @quote_request = QuoteRequest.new(quote_request_params)

    if @quote_request.save
      render json: { success: true, message: 'Quote request submitted successfully!' }, status: :created
    else
      render json: { success: false, errors: @quote_request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def quote_request_params
    params.require(:quote_request).permit(
      :name,
      :email,
      :phone,
      :equipment_type,
      :rental_duration,
      :delivery_address,
      :special_requirements
    )
  end
end
