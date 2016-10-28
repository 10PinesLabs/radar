class AxisResultSerializer < ActiveModel::Serializer
  has_one :axis
  attributes :points

  def axis
    object
  end

  def points
    object.answers.map{ |answer| answer.points }
  end
end
