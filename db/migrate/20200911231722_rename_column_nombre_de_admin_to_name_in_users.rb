class RenameColumnNombreDeAdminToNameInUsers < ActiveRecord::Migration[5.0]
  def change
    rename_column :users, :nombre_de_admin, :name
  end
end
