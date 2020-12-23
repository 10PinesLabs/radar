class RadarTemplateContainerSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :owner, :pinned
  has_many :radar_templates do
    object.radar_templates.select {|radar_template| radar_template.active}.sort{|rt| rt.created_at}
  end
  has_one :active_voting_code
  has_many :users

  def owner
    {id: object.owner.id, name: object.owner.name, email: object.owner.email}
  end

  def users
    object.users
  end

end
