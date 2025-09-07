# == Schema Information
#
# Table name: clients
#
#  id                 :bigint           not null, primary key
#  address            :text
#  company_name       :string
#  contact_name       :string
#  email              :string
#  phone              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  stripe_customer_id :string
#
require "test_helper"

class ClientTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
