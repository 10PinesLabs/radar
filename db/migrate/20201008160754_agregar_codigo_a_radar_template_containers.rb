class AgregarCodigoARadarTemplateContainers < ActiveRecord::Migration[5.0]
  def change
    add_column :radar_template_containers, "show_code", :string
  end
end
