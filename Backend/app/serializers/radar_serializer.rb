class RadarSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :axes

  def axes
    object.axes.map do |axis|
      answers = Answer.where(axis: axis, radar: object).map{ |answer| AnswerSerializer.new(answer) }
      AxisSerializer.new(axis).as_json.merge({answers: answers})
    end
  end
end
