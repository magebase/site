# == Schema Information
#
# Table name: services
#
#  id               :bigint           not null, primary key
#  category         :string
#  content          :text             not null
#  description      :text             not null
#  excerpt          :text
#  icon             :string
#  meta_description :text
#  meta_title       :string
#  position         :integer          default(0)
#  published        :boolean          default(FALSE)
#  published_at     :datetime
#  slug             :string           not null
#  title            :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_services_on_category   (category)
#  index_services_on_published  (published)
#  index_services_on_slug       (slug) UNIQUE
#
class Service < ApplicationRecord
  validates :title, :slug, :description, :content, presence: true
  validates :slug, uniqueness: true

  before_save :generate_slug, if: :title_changed?
  before_save :set_published_at, if: :published_changed?

  scope :published, -> { where(published: true) }

  private

  def generate_slug
    return if title.blank?

    base_slug = title.parameterize
    counter = 1
    slug_candidate = base_slug

    while Service.where(slug: slug_candidate).where.not(id: id).exists?
      counter += 1
      slug_candidate = "#{base_slug}-#{counter}"
    end

    self.slug = slug_candidate
  end

  def set_published_at
    if published? && published_at.nil?
      self.published_at = Time.current
    elsif !published?
      self.published_at = nil
    end
  end
end
