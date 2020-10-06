class RenameRadarTemplateContainersIdToRadarTemplateContainerIdInRadarTemplate < ActiveRecord::Migration[5.0]
  def change
    rename_column :radar_templates, :radar_template_containers_id, :radar_template_container_id
  end
end
