class Radar < ActiveRecord::Base

  ERROR_MESSAGE_FOR_NO_AXES = 'The radar must have at least one axis'

  has_and_belongs_to_many :axes

  validates :axes, presence: { message: ERROR_MESSAGE_FOR_NO_AXES }

  delegate :empty?, to: :axes

  def add(an_axis)
    axes.push(an_axis)
  end

  def add_all(other_axes)
    axes.concat(other_axes)
  end

  def amount_of_axis
    axes.count
  end
end
