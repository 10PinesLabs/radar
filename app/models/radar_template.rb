class RadarTemplate < ApplicationRecord
  has_many :radars
  has_many :axes
  belongs_to :user
  default_scope { order(created_at: :desc) }


  def amount_of_axes
    axes.count
  end

end
