class Vote < ActiveRecord::Base
  has_many :answers

  def self.count_for(a_radar)

  end
end
