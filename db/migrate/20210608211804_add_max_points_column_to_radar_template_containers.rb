class AddMaxPointsColumnToRadarTemplateContainers < ActiveRecord::Migration[5.0]
  def change
    add_column :radar_template_containers, :max_points, :integer, null: false, default: 5
  end
end
