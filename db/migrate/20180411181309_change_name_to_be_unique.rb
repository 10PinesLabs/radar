class ChangeNameToBeUnique < ActiveRecord::Migration
  def change
    change_column :radars, :name, :text, unique: true, null:false
    change_column_default :radars, :name, nil
  end
end
