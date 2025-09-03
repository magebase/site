# == Schema Information
#
# Table name: payments
#
#  id               :bigint           not null, primary key
#  amount           :decimal(, )
#  payment_data     :jsonb
#  payment_method   :string
#  status           :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  quote_request_id :bigint           not null
#  transaction_id   :string
#
# Indexes
#
#  index_payments_on_quote_request_id  (quote_request_id)
#
# Foreign Keys
#
#  fk_rails_...  (quote_request_id => quote_requests.id)
#
require "test_helper"

class PaymentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
