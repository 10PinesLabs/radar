class RadarSerializer < ActiveModel::Serializer
  attributes :id, :active, :description
  has_many :axes
end
