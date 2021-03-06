class RadarTemplateSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at
  has_many :axes
  has_many :radars

  def owner
    {id: object.owner.id, name: object.owner.name, email: object.owner.email}
  end
end
