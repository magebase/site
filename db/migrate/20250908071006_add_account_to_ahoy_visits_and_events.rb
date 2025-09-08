class AddAccountToAhoyVisitsAndEvents < ActiveRecord::Migration[8.0]
  def change
    add_reference :ahoy_visits, :tenant, null: true, foreign_key: true
    add_reference :ahoy_events, :tenant, null: true, foreign_key: true
  end
end
