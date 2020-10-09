
require 'rails_helper'

RSpec.describe RadarTemplateContainer, type: :model do



  context 'when creatig a radar container' do
    let(:radar_template) { create :radar_template}
    let(:container) { radar_template.radar_template_container}

    it 'should have a code that is 7 digit long' do
      expect(container.show_code.length).to eq 7
    end


  end
end
