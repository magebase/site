# == Schema Information
#
# Table name: case_studies
#
#  id                 :bigint           not null, primary key
#  challenge          :text             not null
#  client_logo_url    :string
#  client_name        :string           not null
#  excerpt            :text
#  featured_image_url :string
#  industry           :string           not null
#  meta_description   :text
#  meta_title         :string
#  position           :integer          default(0)
#  published          :boolean          default(FALSE)
#  published_at       :datetime
#  results            :text             not null
#  slug               :string           not null
#  solution           :text             not null
#  title              :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_case_studies_on_industry   (industry)
#  index_case_studies_on_published  (published)
#  index_case_studies_on_slug       (slug) UNIQUE
#
class CaseStudy < ApplicationRecord
  validates :title, :slug, :client_name, :industry, :challenge, :solution, :results, presence: true
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

    while CaseStudy.where(slug: slug_candidate).where.not(id: id).exists?
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
