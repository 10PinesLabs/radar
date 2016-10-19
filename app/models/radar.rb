class Radar < ActiveRecord::Base
  has_and_belongs_to_many :axes

  delegate :empty?, to: :axes

  def add(an_axis)
    axes.push(an_axis)
  end
end
