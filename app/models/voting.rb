class Voting < ApplicationRecord
  CODE_LENGTH = 4

  belongs_to :radar_template_container
  validates :radar_template_container, presence: true
  has_many :radar_templates

  def self.generate!(radar_template_container, ends_at)
    transaction do
      voting = Voting.create!(radar_template_container: radar_template_container, ends_at: ends_at)
      voting.generate_and_save_code!
      radar_template_container.radar_templates.each {|radar_template| Radar.create!(radar_template: radar_template) }
    end
  end

  def generate_and_save_code!
    update!(code: generate_unique_code!)
  end

  def free_code!
    update!(code: nil)
  end

  private

  def generate_unique_code!
    code = generate_code
    until is_unique? code
      code = generate_code
    end
    code
  end

  def generate_code
    SecureRandom.alphanumeric(CODE_LENGTH).upcase
  end

  def is_unique? code
    !Voting.exists?(code: code)
  end
end
