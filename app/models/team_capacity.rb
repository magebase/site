# == Schema Information
#
# Table name: team_capacities
#
#  id                   :bigint           not null, primary key
#  available_developers :integer          default(0), not null
#  capacity_percentage  :decimal(5, 2)    not null
#  current_projects     :integer          default(0), not null
#  last_updated         :datetime         not null
#  total_developers     :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class TeamCapacity < ApplicationRecord
  # Tracks current team capacity and utilization

  # Fields:
  # total_developers: integer - Total number of developers
  # available_developers: integer - Currently available developers
  # current_projects: integer - Number of active projects
  # capacity_percentage: decimal - Current capacity utilization (0-100)
  # last_updated: datetime

  validates :total_developers, presence: true, numericality: { greater_than: 0 }
  validates :available_developers, numericality: { greater_than_or_equal_to: 0 }
  validates :current_projects, numericality: { greater_than_or_equal_to: 0 }
  validates :capacity_percentage, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }

  def self.current_capacity
    order(created_at: :desc).first || create_default
  end

  def self.create_default
    create!(
      total_developers: 5,
      available_developers: 3,
      current_projects: 2,
      capacity_percentage: 60.0,
      last_updated: Time.current
    )
  end

  def utilization_level
    if capacity_percentage < 30
      :low
    elsif capacity_percentage < 70
      :medium
    elsif capacity_percentage < 90
      :high
    else
      :critical
    end
  end

  def capacity_multiplier
    case utilization_level
    when :low
      0.8  # 20% discount when capacity is low
    when :medium
      1.0  # Standard pricing
    when :high
      1.3  # 30% premium when capacity is high
    when :critical
      1.5  # 50% premium when at critical capacity
    end
  end
end
