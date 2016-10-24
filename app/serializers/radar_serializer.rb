class RadarSerializer < ActiveModel::Serializer
  attributes :id
  has_many :axes
end
