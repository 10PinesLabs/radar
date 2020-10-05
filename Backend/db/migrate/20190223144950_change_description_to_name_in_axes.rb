class ChangeDescriptionToNameInAxes < ActiveRecord::Migration
  def change
    rename_column :axes, :description, :name

    add_column :axes, :description, :string, default: 'Sin descripcion', null: true
  end
end
