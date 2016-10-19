require 'rails_helper'

RSpec.describe Radar, type: :model do
  context 'When having a new radar' do
    let(:a_radar) { Radar.new }
    it 'should be empty' do
      expect(a_radar).to be_empty
    end

    context 'and you add an axis to that radar' do
      let(:an_axis) { Axis.new }
      before do
        a_radar.add(an_axis)
      end

      it 'should not be empty' do
        expect(a_radar).not_to be_empty
      end
    end
  end
end
