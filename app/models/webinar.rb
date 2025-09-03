# == Schema Information
#
# Table name: webinars
#
#  id                :bigint           not null, primary key
#  description       :text             not null
#  duration_minutes  :integer
#  excerpt           :text
#  meta_description  :text
#  meta_title        :string
#  position          :integer          default(0)
#  published         :boolean          default(FALSE)
#  published_at      :datetime
#  registration_url  :string
#  scheduled_at      :datetime         not null
#  slug              :string           not null
#  speaker_bio       :text             not null
#  speaker_image_url :string
#  speaker_name      :string           not null
#  thumbnail_url     :string
#  title             :string           not null
#  video_url         :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_webinars_on_published     (published)
#  index_webinars_on_scheduled_at  (scheduled_at)
#  index_webinars_on_slug          (slug) UNIQUE
#
class Webinar < ApplicationRecord
  validates :title, :slug, :description, :speaker_name, :speaker_bio, :scheduled_at, presence: true
  validates :slug, uniqueness: true

  before_save :generate_slug, if: :title_changed?
  before_save :set_published_at, if: :published_changed?

  scope :published, -> { where(published: true) }
  scope :upcoming, -> { where("scheduled_at > ?", Time.current) }
  scope :past, -> { where("scheduled_at <= ?", Time.current) }

  private

  def generate_slug
    return if title.blank?

    base_slug = title.parameterize
    counter = 1
    slug_candidate = base_slug

    while Webinar.where(slug: slug_candidate).where.not(id: id).exists?
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
