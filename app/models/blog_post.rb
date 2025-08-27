class BlogPost < ApplicationRecord
  validates :title, :content, presence: true
  validates :slug, uniqueness: true, allow_blank: true

  before_save :generate_slug, if: :title_changed?
  before_save :set_published_at, if: :published_changed?
  before_save :set_default_author

  scope :published, -> { where(published: true).where.not(published_at: nil) }

  private

  def generate_slug
    return if title.blank?

    base_slug = title.parameterize
    counter = 1
    slug_candidate = base_slug

    while BlogPost.where(slug: slug_candidate).where.not(id: id).exists?
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

  def set_default_author
    self.author_name ||= "Genfix Team"
    self.author_title ||= "Generator Specialists"
    self.author_profile_picture ||= "/images/team-default.jpg"
  end
end
