class AddActiveFlagToRadar < ActiveRecord::Migration
  def change
    add_column :radars, :active, :boolean, default: true
  end
end
