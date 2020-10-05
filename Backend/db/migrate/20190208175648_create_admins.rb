class CreateAdmins < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      t.string :backoffice_id
      t.string :nombre_de_admin
      t.string :email

      t.timestamps null: false
    end
    add_index :admins, :backoffice_id
  end
end
