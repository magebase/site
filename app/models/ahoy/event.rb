class Ahoy::Event < ApplicationRecord
  include Ahoy::QueryMethods

  self.table_name = "ahoy_events"

  belongs_to :visit
  belongs_to :user, optional: true
  belongs_to :tenant, optional: true
end

# == Schema Information
#
# Table name: ahoy_events
#
#  id         :bigint           not null, primary key
#  name       :string
#  properties :jsonb
#  time       :datetime
#  tenant_id  :bigint
#  user_id    :bigint
#  visit_id   :bigint
#
# Indexes
#
#  index_ahoy_events_on_name_and_time  (name,time)
#  index_ahoy_events_on_properties     (properties) USING gin
#  index_ahoy_events_on_tenant_id      (tenant_id)
#  index_ahoy_events_on_user_id        (user_id)
#  index_ahoy_events_on_visit_id       (visit_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
