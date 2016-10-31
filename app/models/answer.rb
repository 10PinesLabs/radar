class Answer < ActiveRecord::Base
  ERROR_MESSAGE_FOR_NO_AXIS = 'The answer must be associated with a question'
  ERROR_MESSAGE_FOR_OUT_OF_RANGE_POINT = 'The amount of points should be between 1 and 5'

  belongs_to :vote
  belongs_to :axis

  delegate :radar, to: :axis

  validates :axis, presence: {message: ERROR_MESSAGE_FOR_NO_AXIS}
  validates :points, :inclusion => { :in => 1..5, message: ERROR_MESSAGE_FOR_OUT_OF_RANGE_POINT }
  validates :vote, presence: true
end
