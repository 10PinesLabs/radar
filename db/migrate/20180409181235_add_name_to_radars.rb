class AddNameToRadars < ActiveRecord::Migration
  def change
    add_column :radars, :name, :text, unique: true, null: false
  end
end
