class Axis < ActiveRecord::Base
  ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION = 'La descripción del eje no puede estar vacía'
  validates :description, presence: { message: ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION }
  validates :radar, presence: true
  belongs_to :radar
  has_many :answers

  def amount_of_answers
    answers.count
  end
end
