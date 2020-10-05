class RenameTableAdmminsToUsers < ActiveRecord::Migration[5.0]
  def change
    rename_table :admins, :users
  end
end
