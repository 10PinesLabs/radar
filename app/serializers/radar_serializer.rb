class RadarSerializer < ActiveModel::Serializer
  attributes :id, :active, :description, :created_at
  has_many :axes
end
