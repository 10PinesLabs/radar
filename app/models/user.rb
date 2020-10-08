class User < ActiveRecord::Base
  has_and_belongs_to_many :radar_templates
  has_and_belongs_to_many :radar_template_containers

  def accessible_radar_templates
    RadarTemplate.where(owner: self) + radar_templates
  end

  def accessible_radar_template_containers
    RadarTemplateContainer.where(owner: self) + radar_template_containers
  end
end
