# == Schema Information
#
# Table name: quote_request_features
#
#  id               :bigint           not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  feature_id       :bigint           not null
#  quote_request_id :bigint           not null
#
# Indexes
#
#  index_quote_request_features_on_feature_id        (feature_id)
#  index_quote_request_features_on_quote_request_id  (quote_request_id)
#
# Foreign Keys
#
#  fk_rails_...  (feature_id => features.id)
#  fk_rails_...  (quote_request_id => quote_requests.id)
#
class QuoteRequestFeature < ApplicationRecord
  belongs_to :quote_request
  belongs_to :feature
end
