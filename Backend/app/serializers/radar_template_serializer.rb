class RadarTemplateSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at
  has_many :axes
  has_many :radars
end
