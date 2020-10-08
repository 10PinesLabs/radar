class RadarTemplateContainer < ApplicationRecord
  include Ownerable
  has_many :radar_templates, -> { order(created_at: :asc) }
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true

  def close owner
    validate_ownership! owner
    update!(active: false)
    radar_templates.each {|rt| rt.close owner}
  end
end
