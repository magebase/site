# == Schema Information
#
# Table name: features
#
#  id                     :bigint           not null, primary key
#  base_cost              :decimal(, )
#  category               :string
#  complexity_level       :integer
#  dependencies           :jsonb
#  description            :text
#  name                   :string
#  requires_customization :boolean
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class Feature < ApplicationRecord
end
