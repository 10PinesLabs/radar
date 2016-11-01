class Radar < ActiveRecord::Base

  ERROR_MESSAGE_FOR_ALREADY_CLOSED = 'No se puede cerrar el radar, el mismo ya está cerrado'
  ERROR_MESSAGE_FOR_NO_QUESTIONS = 'El radar debe tener por lo menos un eje asignado'
  has_many :axes

  validates :axes, presence: {message: ERROR_MESSAGE_FOR_NO_QUESTIONS}

  delegate :empty?, to: :axes

  def self.create_with_axes(axes)
    self.create!(axes: axes)
  end

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
