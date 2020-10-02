class RadarTemplateSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :is_owner
  has_many :axes
  has_many :radars

  def is_owner
    object.is_owned_by? instance_options[:logged_user]
  end
end
