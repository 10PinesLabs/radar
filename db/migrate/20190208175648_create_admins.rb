class CreateAdmins < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      t.string :backoffice_id

      t.timestamps null: false
    end
    add_index :admins, :backoffice_id
  end
end
