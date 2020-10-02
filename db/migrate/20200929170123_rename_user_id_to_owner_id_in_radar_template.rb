class RenameUserIdToOwnerIdInRadarTemplate < ActiveRecord::Migration[5.0]
  def change
    rename_column :radar_templates, :user_id, :owner_id
  end
end
