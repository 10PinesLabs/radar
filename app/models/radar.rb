class Radar < ApplicationRecord

  ERROR_MESSAGE_FOR_ALREADY_CLOSED = 'No se puede cerrar el radar, el mismo ya está cerrado'
  ERROR_MESSAGE_FOR_DESCRIPTION_EMPTY = 'El radar debe tener una descripción'
  ERROR_MESSAGE_FOR_NAME_EMPTY = 'El radar debe tener un nombre'
  ERROR_MESSAGE_FOR_RADAR_TEMPLATE_MISSING = 'El radar debe pertenecer a un template de radar'
  default_scope { order(created_at: :asc) }
  belongs_to :radar_template
  belongs_to :voting
  has_many :answers

  validates :description, presence: {message: ERROR_MESSAGE_FOR_DESCRIPTION_EMPTY}
  validates :name, presence: {message: ERROR_MESSAGE_FOR_NAME_EMPTY}
  validates :radar_template, presence: {message: ERROR_MESSAGE_FOR_RADAR_TEMPLATE_MISSING}

  delegate :empty?, to: :axes
  delegate :axes, to: :radar_template

  def times_completed
    Vote.count_for(self)
  end

  def close
    update!(active: false)
  end

  def active?
    active
  end

  def global_average
    points = answers.map { |answer| answer.points}
    total_sum = points.inject(:+)
    num_points = points.length
    global_average = 0
    global_average = total_sum.to_f / num_points unless num_points == 0
    global_average
  end

  private

end
