class Vote < ActiveRecord::Base
  ERROR_MESSAGE_FOR_NO_ANSWERS = 'The vote must have at least one answer'
  ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS = 'The vote cannot have answers from different radars'
  ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR = 'You cannot answer a question from a closed radar'
  ERROR_MESSAGE_FOR_INCOMPLETE_VOTE = 'The vote must have an answer for all of the radar axes'

  has_many :answers
  has_many :axes, through: :answers
  validates :answers, presence: {message: ERROR_MESSAGE_FOR_NO_ANSWERS}
  before_create :assert_answers_from_same_radar, :assert_active_radar, :assert_has_answers_for_all_the_radar_axes

  def self.count_for(a_radar)
    self.select { |vote| vote.for?(a_radar) }.count
  end

  def for?(a_radar)
    axes.all? { |axis| axis.radar == a_radar }
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

  def has_answers_for_all_radar_axes?
    answered_axes = answers.map(&:axis)
    self.radar.axes.all? do |axis|
      answered_axes.include? axis
    end
  end

  def assert_active_radar
    raise CannotVoteAClosedRadar, ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR unless radar_active?
  end

  def assert_answers_from_same_radar
    raise CannotVoteInDifferentRadars, ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS unless answers_from_same_radar
  end

  def assert_has_answers_for_all_the_radar_axes
    raise IncompleteVote, ERROR_MESSAGE_FOR_INCOMPLETE_VOTE unless has_answers_for_all_radar_axes?
  end
end
