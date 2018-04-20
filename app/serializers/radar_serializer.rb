class RadarSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at
  has_many :axes
end
