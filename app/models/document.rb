class Document < ApplicationRecord
  belongs_to :tenant
  belongs_to :user

  validates :name, presence: true
  validates :file_path, presence: true
  validates :file_type, presence: true

  # Add file attachment functionality (you may want to use ActiveStorage or CarrierWave)
  # has_one_attached :file
end
