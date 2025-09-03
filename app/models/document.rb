# == Schema Information
#
# Table name: documents
#
#  id         :bigint           not null, primary key
#  file_path  :string
#  file_type  :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tenant_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_documents_on_tenant_id  (tenant_id)
#  index_documents_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#  fk_rails_...  (user_id => users.id)
#
class Document < ApplicationRecord
  belongs_to :tenant
  belongs_to :user

  validates :name, presence: true
  validates :file_path, presence: true
  validates :file_type, presence: true

  # Add file attachment functionality (you may want to use ActiveStorage or CarrierWave)
  # has_one_attached :file
end
