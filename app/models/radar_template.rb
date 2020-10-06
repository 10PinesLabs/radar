class RadarTemplate < ApplicationRecord
  OWNER_ERROR = 'No puede agregar un usuario a un radar template que no le pertenece'
  belongs_to :radar_template_container
  validates :radar_template_container, presence: true
  has_many :radars
  has_many :axes
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true
  has_and_belongs_to_many :users
  default_scope { order(created_at: :desc) }

  def amount_of_axes
    axes.count
  end

  def add_user(owner, user)
    validate_ownership! owner
    users << user
  end

  def close owner
    validate_ownership! owner
    update!(active: false)
    radars.each {|r| r.close owner}
  end

  def validate_ownership! owner
    raise OWNER_ERROR unless is_owned_by? owner
  end

  def is_known_by? user
    users.include?(user) || is_owned_by?(user)
  end

  def is_owned_by? user
    user.id == self.owner.id
  end

end
