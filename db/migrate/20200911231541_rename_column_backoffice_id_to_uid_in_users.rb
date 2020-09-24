class RenameColumnBackofficeIdToUidInUsers < ActiveRecord::Migration[5.0]
  def change
    rename_column :users, :backoffice_id, :uid
  end
end
