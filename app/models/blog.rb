# == Schema Information
#
# Table name: blogs
#
#  id               :bigint           not null, primary key
#  author           :string
#  category         :string
#  content          :text
#  excerpt          :text
#  featured_image   :string
#  meta_description :string
#  meta_title       :string
#  published        :boolean
#  published_at     :datetime
#  slug             :string
#  tags             :jsonb
#  title            :string
#  use_case_slug    :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Blog < ApplicationRecord
  include AASM

  # Validations
  validates :title, presence: true, length: { minimum: 5, maximum: 200 }
  validates :slug, presence: true, uniqueness: true, format: { with: /\A[a-z0-9-]+\z/ }
  validates :content, presence: true, length: { minimum: 100 }
  validates :excerpt, length: { maximum: 500 }
  validates :meta_title, length: { maximum: 60 }
  validates :meta_description, length: { maximum: 160 }
  validates :author, presence: true
  validates :category, presence: true
  validates :use_case_slug, presence: true

  # Scopes
  scope :published, -> { where(published: true) }
  scope :by_category, ->(category) { where(category: category) }
  scope :by_use_case, ->(use_case_slug) { where(use_case_slug: use_case_slug) }
  scope :recent, -> { order(published_at: :desc) }
  scope :featured, -> { where(featured: true) }

  # Callbacks
  before_validation :generate_slug, if: :title_changed?
  before_save :set_published_at, if: :published_changed?

  # AASM for blog status
  aasm column: :published do
    state :draft, initial: true
    state :published

    event :publish do
      transitions from: :draft, to: :published
    end

    event :unpublish do
      transitions from: :published, to: :draft
    end
  end

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
    Blog.published
        .by_category(category)
        .where.not(id: id)
        .recent
        .limit(limit)
  end

  def use_case_posts(limit = 10)
    Blog.published
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

    while Blog.where(slug: slug_candidate).where.not(id: id).exists?
      slug_candidate = "#{base_slug}-#{counter}"
      counter += 1
    end

    self.slug = slug_candidate
  end

  def set_published_at
    if published? && published_at.blank?
      self.published_at = Time.current
    elsif !published?
      self.published_at = nil
    end
  end
end
