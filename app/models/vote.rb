class Vote < ActiveRecord::Base

  ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS = 'The vote cannot have answers from different radars'

  has_many :answers
  has_many :axes, through: :answers

  validate :assert_answers_from_same_radar

  def self.count_for(a_radar)
    self.select{ |vote| vote.for?(a_radar) }.count
  end

  def for?(a_radar)
    axes.all?{ |axis| axis.radar == a_radar }
  end

  def answers_from_same_radar
    radar = answers.first.radar
    answers.all?{ | answer | answer.radar == radar }
  end

  def assert_answers_from_same_radar
    errors.add(:answers, ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS) unless answers_from_same_radar
  end
end
