class RadarTemplateContainerSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :owner, :pinned, :max_points
  has_many :radar_templates do
    object.sorted_radar_templates
  end
  has_one :active_voting_code
  has_many :users

  def owner
    {id: object.owner.id, name: object.owner.name, email: object.owner.email, remaining_containers: object.owner.remaining_containers}
  end

  def users
    object.users
  end

end
