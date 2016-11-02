class AddDescriptionToRadars < ActiveRecord::Migration
  def change
    add_column :radars, :description, :text, null: false
  end
end
