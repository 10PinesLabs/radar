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

  context 'When creating a new radar' do
    context 'with no axes' do
      it 'should raise an error' do
        expect{ Radar.create! }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:axes]).to be_include Radar::ERROR_MESSAGE_FOR_NO_QUESTIONS
        end
      end
    end
  end
end
