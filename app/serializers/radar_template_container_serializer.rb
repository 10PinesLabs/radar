class RadarTemplateContainerSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :is_owner, :pinned
  has_many :radar_templates
  has_one :active_voting_code
  has_many :users

  def owner
    {id: object.owner.id, name: object.owner.name, email: object.owner.email}
  end

  def users
    object.users
  end

  def radar_templates
    object.radar_templates.select {|radar_template| radar_template.active}
  end
end
