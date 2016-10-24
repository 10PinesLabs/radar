class Radar < ActiveRecord::Base

  ERROR_MESSAGE_FOR_NO_QUESTIONS = 'The radar must have at least one question'
  has_many :axes

  validates :axes, presence: { message: ERROR_MESSAGE_FOR_NO_QUESTIONS }

  delegate :empty?, to: :axes

  def self.create_with_axes(axes)
    self.create!(axes: axes)
  end

  def add(an_axis)
    axes.push(an_axis)
  end

  def amount_of_questions
    axes.count
  end

  def times_completed
    Vote.count_for(self)
  end
end
