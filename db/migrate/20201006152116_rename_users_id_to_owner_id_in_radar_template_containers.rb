class RenameUsersIdToOwnerIdInRadarTemplateContainers < ActiveRecord::Migration[5.0]
  def change
    rename_column :radar_template_containers, :users_id, :owner_id
  end
end
