class AddUserFkToRadarTemplate < ActiveRecord::Migration[5.0]
  def change
    add_belongs_to :radar_templates, :users
  end
end
