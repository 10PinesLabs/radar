class RadarResultSerializer < ActiveModel::Serializer
  has_one :radar
  attributes :axes_results

  def radar
    object
  end

  def axes_results
    object.axes.map do |axis|
      answers = Answer.where(axis: axis, radar: object).map{ |answer| AnswerSerializer.new(answer) }
      answers_points = answers.map{|answer| answer.object.points}
      {axis: {id: axis.id, name: axis.name, description: axis.description, answers: answers}, points: answers_points}
    end
  end
end
