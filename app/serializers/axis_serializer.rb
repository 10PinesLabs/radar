class AxisSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :answers
end
