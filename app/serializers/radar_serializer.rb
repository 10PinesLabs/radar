class RadarSerializer < ActiveModel::Serializer
  attributes :id, :active
  has_many :axes
end
