class RadarTemplateContainer < ApplicationRecord
  include Ownerable
  has_many :radar_templates, -> { order(created_at: :asc) }
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true
  after_create :set_show_code
  validates_uniqueness_of :show_code

  def close owner
    validate_ownership! owner
    update!(active: false)
    radar_templates.each {|rt| rt.close owner}
  end

  private

  def set_show_code
    self.show_code = generate_code
    until self.save
      self.show_code = generate_code
    end
  end

  def generate_code
    ((1..9).to_a.sample *7).join
  end
end
