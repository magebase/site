class QuoteRequestFeature < ApplicationRecord
  belongs_to :quote_request
  belongs_to :feature
end
