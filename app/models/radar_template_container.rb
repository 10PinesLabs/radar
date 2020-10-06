class RadarTemplateContainer < ApplicationRecord
  has_many :radar_templates, -> { order(created_at: :asc) }
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true

  def is_owned_by? user
    user.id == self.owner.id
  end

  def validate_ownership! owner
    raise OWNER_ERROR unless is_owned_by? owner
  end

  def close owner
    validate_ownership! owner
    update!(active: false)
    radar_templates.each {|rt| rt.close owner}
  end
end
