class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :points
  has_one :axis
end
