class AddNameToRadar < ActiveRecord::Migration
  def change
    add_column :radars, :name, :text
    Radar.all.each{ |radar|
      radar.name = radar.description
      radar.save
    }
    change_column_null :radars, :name, false
  end
end
