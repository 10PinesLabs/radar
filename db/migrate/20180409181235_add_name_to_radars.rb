class AddNameToRadars < ActiveRecord::Migration
  def change
    add_column :radars, :name, :string, default: 'Sin Nombre'
  end
end
