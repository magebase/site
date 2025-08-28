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
