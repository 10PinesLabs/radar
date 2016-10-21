class Answer < ActiveRecord::Base
  ERROR_MESSAGE_FOR_NO_AXIS = 'The answer must be associated with a question'

  belongs_to :vote
  belongs_to :axis

  delegate :radar, to: :axis

  validates :axis, presence: {message: ERROR_MESSAGE_FOR_NO_AXIS}
end
