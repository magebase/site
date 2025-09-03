# == Schema Information
#
# Table name: blog_posts
#
#  id                     :bigint           not null, primary key
#  author_name            :string
#  author_profile_picture :string
#  author_title           :string
#  content                :text
#  excerpt                :string
#  featured               :boolean
#  published              :boolean
#  published_at           :datetime
#  slug                   :string
#  title                  :string
#  use_case_slug          :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class BlogPost < ApplicationRecord
  validates :title, :content, presence: true
  validates :slug, uniqueness: true, allow_blank: true
  validates :use_case_slug, presence: true

  before_save :generate_slug, if: :title_changed?
  before_save :set_published_at, if: :published_changed?
  before_save :set_default_author

  scope :published, -> { where(published: true).where.not(published_at: nil) }
  scope :by_use_case, ->(use_case_slug) { where(use_case_slug: use_case_slug) }
  scope :recent, -> { order(published_at: :desc) }
  scope :featured, -> { where(featured: true) }

  # Methods
  def to_param
    slug
  end

  def published?
    published && published_at.present?
  end

  def reading_time
    words_per_minute = 200
    word_count = content.split.size
    (word_count / words_per_minute).ceil
  end

  def related_posts(limit = 5)
    BlogPost.published
        .where.not(id: id)
        .recent
        .limit(limit)
  end

  def use_case_posts(limit = 10)
    BlogPost.published
        .by_use_case(use_case_slug)
        .where.not(id: id)
        .recent
        .limit(limit)
  end

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
    if published && published_at.nil?
      self.published_at = Time.current
    elsif !published
      self.published_at = nil
    end
  end

  def set_default_author
    self.author_name ||= "Genfix Team"
    self.author_title ||= "Generator Specialists"
    self.author_profile_picture ||= "/images/team-default.jpg"
  end
end
