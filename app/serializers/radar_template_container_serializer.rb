class RadarTemplateContainerSerializer < ActiveModel::Serializer
  attributes :id, :active, :name, :description, :created_at, :is_owner, :pinned
  has_many :radar_templates
  has_one :active_voting_code

  def is_owner
    instance_options[:logged_user] && object.is_owned_by?(instance_options[:logged_user])
  end
end
