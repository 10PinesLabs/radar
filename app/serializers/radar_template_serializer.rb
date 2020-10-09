class RadarTemplateSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :is_owner
  has_many :axes
  has_many :radars

  def is_owner
    logged_user = instance_options[:logged_user]
    logged_user ? object.is_owned_by?(logged_user) : false
  end
end
