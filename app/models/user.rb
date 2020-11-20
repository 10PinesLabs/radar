class User < ActiveRecord::Base
  has_and_belongs_to_many :radar_templates
  has_and_belongs_to_many :radar_template_containers

  def accessible_radar_templates
    RadarTemplate.where(owner: self) + radar_templates
  end

  def accessible_radar_template_containers
    owned_radar_template_containers + radar_template_containers
  end

  def owned_radar_template_containers
    RadarTemplateContainer.where(owner: self)
  end

  def can_create_new_container?
    max_containers.nil? ? true : owned_radar_template_containers.count < max_containers
  end
end
