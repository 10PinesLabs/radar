class ChangeDefaultOnRadars < ActiveRecord::Migration
  def change
    change_column_default :radars, :description, 'Sin Descripción'
  end
end
