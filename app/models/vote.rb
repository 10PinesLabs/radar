class Vote < ActiveRecord::Base
  ERROR_MESSAGE_FOR_NO_ANSWERS = 'The vote must have at least one answer'
  ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS = 'The vote cannot have answers from different radars'
  ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR = 'You cannot answer a question from a closed radar'

  has_many :answers
  has_many :axes, through: :answers
  validates :answers, presence: {message: ERROR_MESSAGE_FOR_NO_ANSWERS}
  validate :assert_answers_from_same_radar, :assert_active_radar

  def self.count_for(a_radar)
    self.select{ |vote| vote.for?(a_radar) }.count
  end

  def for?(a_radar)
    axes.all?{ |axis| axis.radar == a_radar }
  end

  def answers_from_same_radar
    answers.blank? || answers.all?{ | answer | answer.radar == self.radar }
  end

  def radar
    answers.first.radar
  end

  def radar_active?
    answers.blank? || self.radar.active?
  end

  def assert_active_radar
    errors.add(:radar, ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR) unless radar_active?
  end

  def assert_answers_from_same_radar
    errors.add(:answers, ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS) unless answers_from_same_radar
  end
end
