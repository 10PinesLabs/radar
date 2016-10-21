class Vote < ActiveRecord::Base
  has_many :answers
  has_many :axes, through: :answers

  validate :answers_from_same_radar

  def self.count_for(a_radar)
    self.select{ |vote| vote.for?(a_radar) }.count
  end

  def for?(a_radar)
    axes.all?{ |axis| axis.radar == a_radar }
  end

  def answers_from_same_radar
    radar = answers.first.axis.radar
    axes.all?{ | axis | axis.radar == radar }
  end
end
