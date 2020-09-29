class RadarTemplate < ApplicationRecord
  has_many :radars
  has_many :axes
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true
  default_scope { order(created_at: :desc) }


  def amount_of_axes
    axes.count
  end

end
