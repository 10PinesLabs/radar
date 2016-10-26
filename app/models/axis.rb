class Axis < ActiveRecord::Base
  ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION = "The Axis' description cannot be empty"
  validates :description, presence: { message: ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION }
  validates :radar, presence: true
  belongs_to :radar
  has_many :answers

  def amount_of_answers
    answers.count
  end
end
