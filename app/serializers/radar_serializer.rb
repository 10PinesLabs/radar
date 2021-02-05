class RadarSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :axes, :global_average, :voting_id

  def axes
    object.axes.map do |axis|
      answers = Answer.where(axis: axis, radar: object).map{ |answer| AnswerSerializer.new(answer) }
      AxisSerializer.new(axis).as_json.merge({answers: answers})
    end
  end

  def global_average
    object.global_average
  end

  def voting_id
    object.voting.id
  end

end
