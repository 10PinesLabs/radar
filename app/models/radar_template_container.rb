class RadarTemplateContainer < ApplicationRecord
  CANNOT_HAVE_MORE_THAN_ONE_ACTIVE_VOTING_ERROR_MESSAGE = "No puede haber mas de una votación activa al mismo tiempo"

  include Ownerable
  has_many :radar_templates, -> { order(created_at: :asc) }
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true
  has_many :votings

  def active_voting
    votings.all.select{ |voting| voting.active? }.first
  end

  def active_voting_code
    active_voting && active_voting.code
  end

  def validate_no_active_votings!
    raise RuntimeError.new(CANNOT_HAVE_MORE_THAN_ONE_ACTIVE_VOTING_ERROR_MESSAGE) if active_voting.present?
  end

  def close owner
    validate_ownership! owner
    update!(active: false)
    radar_templates.each {|rt| rt.close owner}
  end
end
