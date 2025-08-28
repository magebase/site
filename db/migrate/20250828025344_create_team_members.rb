class CreateTeamMembers < ActiveRecord::Migration[8.0]
  def change
    create_table :team_members do |t|
      t.string :name, null: false
      t.string :position, null: false
      t.text :bio, null: false
      t.string :email
      t.string :phone
      t.string :linkedin_url
      t.string :twitter_url
      t.string :github_url
      t.string :profile_image_url
      t.boolean :active, default: true
      t.integer :sort_order, default: 0

      t.timestamps
    end

    add_index :team_members, :active
    add_index :team_members, :sort_order
  end
end
