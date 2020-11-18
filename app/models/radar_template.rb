class RadarTemplate < ApplicationRecord
  include Ownerable
  belongs_to :radar_template_container
  validates :radar_template_container, presence: true
  has_many :radars
  has_many :axes
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true
  default_scope { order(created_at: :desc) }

  def amount_of_axes
    axes.count
  end

  def close owner
    validate_ownership! owner
    update!(active: false)
    radars.each {|r| r.close}
  end


end
