class Axis < ApplicationRecord
  ERROR_MESSAGE_FOR_EMPTY_NAME = 'El nombre del eje no puede estar vacío'
  ERROR_MESSAGE_FOR_EMPTY_RADAR_TEMPLATE = 'El eje tiene que estar asociado a un template de radar'

  validates :name, presence: { message: ERROR_MESSAGE_FOR_EMPTY_NAME }
  belongs_to :radar_template
  validates :radar_template, presence: { message: ERROR_MESSAGE_FOR_EMPTY_RADAR_TEMPLATE }

  def amount_of_answers
    answers.count
  end
end
