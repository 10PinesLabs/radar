class RadarTemplateContainerSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :is_owner, :owner
  has_many :radar_templates
  has_one :active_voting_code
  has_many :users

  def is_owner
    instance_options[:logged_user] && object.is_owned_by?(instance_options[:logged_user])
  end

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
