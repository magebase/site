class CreateProjectMilestones < ActiveRecord::Migration[8.0]
  def change
    create_table :project_milestones do |t|
      t.references :quote_request, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.date :due_date
      t.string :status
      t.jsonb :milestone_data

      t.timestamps
    end
  end
end
