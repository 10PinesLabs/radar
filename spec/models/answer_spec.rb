require 'rails_helper'

RSpec.describe Answer, type: :model do
  context 'When creating an answer' do
    context 'with no axis' do
      it 'should raise an error' do
        expect { Answer.create! }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:axis]).to be_include Answer::ERROR_MESSAGE_FOR_NO_AXIS
        end
      end
    end
    context 'with an axis from a closed Radar' do
      let(:axis) { Axis.new(description: 'ble') }
      let(:a_radar) { Radar.create_with_axes([axis]) }
      before :each do
        a_radar.close
      end
      it 'should err' do
        expect { Answer.create!(axis: axis, points: 3) }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:axis]).to be_include Answer::ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR
        end
      end
    end
  end
end
