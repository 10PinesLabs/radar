class AddAssociationRadarAndAxisToRadarTemplates < ActiveRecord::Migration[5.0]
  def change
    add_belongs_to :radars, :radar_template
    add_belongs_to :axes, :radar_template
  end
end
