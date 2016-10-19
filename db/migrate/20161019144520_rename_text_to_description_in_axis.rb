class RenameTextToDescriptionInAxis < ActiveRecord::Migration
  def change
    rename_column :axes, :text, :description
  end
end
