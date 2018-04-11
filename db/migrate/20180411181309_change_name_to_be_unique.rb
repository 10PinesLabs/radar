class ChangeNameToBeUnique < ActiveRecord::Migration
  def change
    change_column :radars, :name, :text, unique: true
  end
end
