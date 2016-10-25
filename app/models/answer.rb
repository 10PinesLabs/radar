class Answer < ActiveRecord::Base
  ERROR_MESSAGE_FOR_NO_AXIS = 'The answer must be associated with a question'
  ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR = 'You cannot answer a question from a closed radar'
  belongs_to :vote
  belongs_to :axis

  delegate :radar, to: :axis

  validates :axis, presence: {message: ERROR_MESSAGE_FOR_NO_AXIS}
  validate :assert_active_radar

  def assert_active_radar
    errors.add(:axis, ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR) unless axis.nil? || axis.radar.active?
  end
end
