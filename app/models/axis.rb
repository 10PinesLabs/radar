class Axis < ApplicationRecord
  ERROR_MESSAGE_FOR_EMPTY_NAME = 'El nombre del eje no puede estar vacío'
  validates :name, presence: { message: ERROR_MESSAGE_FOR_EMPTY_NAME }
  validates :radar, presence: true
  belongs_to :radar
  has_many :answers

  def amount_of_answers
    answers.count
  end
end
