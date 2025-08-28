class CreateWebinars < ActiveRecord::Migration[8.0]
  def change
    create_table :webinars do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :description, null: false
      t.string :speaker_name, null: false
      t.text :speaker_bio, null: false
      t.datetime :scheduled_at, null: false
      t.integer :duration_minutes
      t.string :registration_url
      t.string :video_url
      t.text :excerpt
      t.string :meta_title
      t.text :meta_description
      t.string :speaker_image_url
      t.string :thumbnail_url
      t.boolean :published, default: false
      t.datetime :published_at
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :webinars, :slug, unique: true
    add_index :webinars, :published
    add_index :webinars, :scheduled_at
  end
end
