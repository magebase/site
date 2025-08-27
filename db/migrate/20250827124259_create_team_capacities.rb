class CreateTeamCapacities < ActiveRecord::Migration[8.0]
  def change
    create_table :team_capacities do |t|
      t.integer :total_developers, null: false
      t.integer :available_developers, null: false, default: 0
      t.integer :current_projects, null: false, default: 0
      t.decimal :capacity_percentage, precision: 5, scale: 2, null: false
      t.datetime :last_updated, null: false

      t.timestamps
    end
  end
end
