class Radar < ActiveRecord::Base

  ERROR_MESSAGE_FOR_ALREADY_CLOSED = 'No se puede cerrar el radar, el mismo ya está cerrado'
  ERROR_MESSAGE_FOR_NO_QUESTIONS = 'El radar debe tener por lo menos un eje asignado'
  ERROR_MESSAGE_FOR_DESCRIPTION_EMPTY = 'El radar debe tener una descripción'
  ERROR_MESSAGE_FOR_NAME_EMPTY = 'El radar debe tener un nombre'
  has_many :axes

  validates :axes, presence: {message: ERROR_MESSAGE_FOR_NO_QUESTIONS}
  validates :description, presence: {message: ERROR_MESSAGE_FOR_DESCRIPTION_EMPTY}
  validates :name, presence: {message: ERROR_MESSAGE_FOR_NAME_EMPTY}
  validates_uniqueness_of :name

  delegate :empty?, to: :axes

  def add(an_axis)
    axes.push(an_axis)
  end

  def amount_of_axes
    axes.count
  end

  def times_completed
    Vote.count_for(self)
  end

  def close
    assert_active_radar
    self.active= false
  end

  def active?
    active
  end

  private

  def assert_active_radar
    raise AlreadyClosedRadarException, ERROR_MESSAGE_FOR_ALREADY_CLOSED unless active?
  end
end
