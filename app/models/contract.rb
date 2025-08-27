class Contract < ApplicationRecord
  belongs_to :quote_request
  belongs_to :client
end
