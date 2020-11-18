class PermitirDescripcionNula < ActiveRecord::Migration[5.0]
  def change
    change_column_null :radar_template_containers, :description, true
  end
end
