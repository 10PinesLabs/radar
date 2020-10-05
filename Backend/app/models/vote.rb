class Vote < ApplicationRecord
  ERROR_MESSAGE_FOR_NO_ANSWERS = 'El voto debe tener por lo menos una respuesta a un eje'
  ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS = 'El voto no puede tener respuestas a diferentes radares'
  ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR = 'No se puede votar en un radar cerrado'
  ERROR_MESSAGE_MISSING_AXES = 'Tenés que completar todos los ejes para poder finalizar tu votación'

  has_many :answers
  has_many :axes, through: :answers
  validates :answers, presence: {message: ERROR_MESSAGE_FOR_NO_ANSWERS}
  before_create :assert_active_radar,
                :assert_right_amount_of_answers,
                :assert_has_answer_for_each_radar_axis

  def self.count_for(a_radar)
    self.select { |vote| vote.for?(a_radar) }.count
  end

  def for?(a_radar)
    answers.all? { |answer| answer.radar == a_radar }
  end

  def answers_from_same_radar
    answers.all? { |answer| answer.radar == self.radar }
  end

  def radar
    answers.first.radar
  end

  def radar_active?
    self.radar.active?
  end

  def right_amount_of_answers?
    radar.axes.length == answers.length
  end

  def has_one_answer_for_each_radar_axis?
    self.radar.axes.all? { |axis| exists_answer_for_axis?(axis) }
  end

  def exists_answer_for_axis?(axis)
    answers.any? { |answer| answer.is_for? axis}
  end

  def assert_active_radar
    raise CannotVoteAClosedRadar, ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR unless radar_active?
  end

  def assert_right_amount_of_answers
    raise IncompleteVote, ERROR_MESSAGE_MISSING_AXES unless right_amount_of_answers?
  end

  def assert_has_answer_for_each_radar_axis
    raise IncompleteVote, ERROR_MESSAGE_MISSING_AXES unless has_one_answer_for_each_radar_axis?
  end
end
