class User < ActiveRecord::Base
  has_and_belongs_to_many :radar_templates

  def accessible_radar_templates
    RadarTemplate.where(owner: self) + radar_templates
  end

  def accessible_radar_template_containers
    RadarTemplateContainer.where(owner: self)
  end
end
