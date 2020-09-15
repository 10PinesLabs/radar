class RadarTemplate < ApplicationRecord
  has_many :radars
  has_many :axes
  belongs_to :user

  def amount_of_axes
    axes.count
  end

end
