class ChangeNameToBeTextInRadars < ActiveRecord::Migration
  def change
    change_column :radars, :name, :text
  end
end
