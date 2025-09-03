# == Schema Information
#
# Table name: team_members
#
#  id                :bigint           not null, primary key
#  active            :boolean          default(TRUE)
#  bio               :text             not null
#  email             :string
#  github_url        :string
#  linkedin_url      :string
#  name              :string           not null
#  phone             :string
#  position          :string           not null
#  profile_image_url :string
#  sort_order        :integer          default(0)
#  twitter_url       :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_team_members_on_active      (active)
#  index_team_members_on_sort_order  (sort_order)
#
class TeamMember < ApplicationRecord
  validates :name, :position, :bio, presence: true
  validates :email, uniqueness: true, allow_blank: true

  scope :active, -> { where(active: true) }
  scope :ordered, -> { order(position: :asc) }
end
