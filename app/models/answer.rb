class Answer < ApplicationRecord
  ERROR_MESSAGE_FOR_NO_AXIS = 'La respuesta tiene que estar asociada a una pregunta'
  ERROR_MESSAGE_FOR_NO_RADAR = 'La respuesta tiene que estar asociada a un radar'
  ERROR_MESSAGE_FOR_OUT_OF_RANGE_POINT = 'La puntuación debe estar en el rango de 1 a 5'

  belongs_to :vote
  belongs_to :axis
  belongs_to :radar

  validates :radar, presence: {message: ERROR_MESSAGE_FOR_NO_RADAR}
  validates :axis, presence: {message: ERROR_MESSAGE_FOR_NO_AXIS}
  validate :points_are_in_permitted_range
  validates :vote, presence: true

  def points_are_in_permitted_range
    errors.add(:points, ERROR_MESSAGE_FOR_OUT_OF_RANGE_POINT) unless points >= 1 && points <= radar.max_points
  end

  def is_for?(an_axis)
    axis == an_axis
  end
end
