class Answer < ActiveRecord::Base
  ERROR_MESSAGE_FOR_NO_AXIS = 'La respuesta tiene que estar asociada a una pregunta'
  ERROR_MESSAGE_FOR_OUT_OF_RANGE_POINT = 'La puntuación debe estar en el rango de 1 a 5'

  belongs_to :vote
  belongs_to :axis

  delegate :radar, to: :axis

  validates :axis, presence: {message: ERROR_MESSAGE_FOR_NO_AXIS}
  validates :points, :inclusion => {:in => 1..5, message: ERROR_MESSAGE_FOR_OUT_OF_RANGE_POINT}
  validates :vote, presence: true

  def is_for?(an_axis)
    axis == an_axis
  end
end
