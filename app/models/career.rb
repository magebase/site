# == Schema Information
#
# Table name: careers
#
#  id               :bigint           not null, primary key
#  description      :text             not null
#  employment_type  :string
#  excerpt          :text
#  location         :string           not null
#  meta_description :text
#  meta_title       :string
#  position         :integer          default(0)
#  published        :boolean          default(FALSE)
#  published_at     :datetime
#  requirements     :text             not null
#  salary_range     :string
#  slug             :string           not null
#  status           :string           default("open")
#  title            :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_careers_on_location   (location)
#  index_careers_on_published  (published)
#  index_careers_on_slug       (slug) UNIQUE
#  index_careers_on_status     (status)
#
class Career < ApplicationRecord
  validates :title, :slug, :description, :requirements, :location, presence: true
  validates :slug, uniqueness: true

  before_save :generate_slug, if: :title_changed?
  before_save :set_published_at, if: :published_changed?

  scope :published, -> { where(published: true) }
  scope :open, -> { where(status: "open") }

  private

  def generate_slug
    return if title.blank?

    base_slug = title.parameterize
    counter = 1
    slug_candidate = base_slug

    while Career.where(slug: slug_candidate).where.not(id: id).exists?
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
