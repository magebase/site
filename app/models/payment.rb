class Payment < ApplicationRecord
  belongs_to :quote_request
end
