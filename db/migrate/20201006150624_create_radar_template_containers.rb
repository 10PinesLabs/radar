class CreateRadarTemplateContainers < ActiveRecord::Migration[5.0]
  def change
    create_table :radar_template_containers do |t|
      t.text :description, null: false
      t.text :name, null: false
      t.timestamps null: false
      t.boolean :active, null: false, default: true
    end
  end
end
