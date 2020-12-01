class RadarTemplateContainerSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :owner, :pinned, :active_voting
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

  def active_voting
    #We are not using voting serializing here to avoid circular dependencies between serializers
    voting = object.active_voting
    !!voting ? {id: voting.id, code: voting.code, ends_at: voting.ends_at} : {}
  end
end
