class AddAssociationRadarTemplateContainerToUser < ActiveRecord::Migration[5.0]
  def change
    add_belongs_to :radar_template_containers, :users
  end
end
