class Vote < ActiveRecord::Base
  has_many :answers
  has_many :axes, through: :answers

  def self.count_for(a_radar)
    self.select{ |vote| vote.for?(a_radar) }.count
  end

  def for?(a_radar)
    axes.all?{ |axis| axis.radar == a_radar }
  end
end
