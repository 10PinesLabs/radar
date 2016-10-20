class Radar < ActiveRecord::Base

  ERROR_MESSAGE_FOR_NO_QUESTIONS = 'The radar must have at least one question'
  has_many :questions
  has_many :axes, through: :questions

  validates :questions, presence: { message: ERROR_MESSAGE_FOR_NO_QUESTIONS }

  delegate :empty?, to: :questions

  def self.create_with_axes(axes)
    questions = axes.map{ |axis| Question.create!(axis: axis) }
    self.create!(questions: questions)
  end

  def add(an_axis)
    questions.push(Question.new(axis: an_axis))
  end

  def amount_of_questions
    questions.count
  end
end
