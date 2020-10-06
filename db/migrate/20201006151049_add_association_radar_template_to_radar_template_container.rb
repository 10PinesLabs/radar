class AddAssociationRadarTemplateToRadarTemplateContainer < ActiveRecord::Migration[5.0]
  def change
    add_belongs_to :radar_templates, :radar_template_containers
  end
end
