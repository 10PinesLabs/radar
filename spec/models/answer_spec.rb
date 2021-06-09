require 'rails_helper'

RSpec.describe Answer, type: :model do
  let(:max_points) {5}
  let(:radar_template_container) {create(:radar_template_container, max_points: max_points)}
  let(:radar_template){create(:radar_template, radar_template_container: radar_template_container)}
  let(:radar) {create(:radar, radar_template: radar_template)}
  let(:points) {max_points - 1}
  context 'When creating an answer' do
    subject do
      Answer.create!(radar: radar, points: points)
    end
    context 'with no axis' do
      it 'should raise an error' do
        expect { subject }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:axis]).to be_include Answer::ERROR_MESSAGE_FOR_NO_AXIS
        end
      end
    end
    context 'with no vote' do
      it 'should raise an error' do
        expect { subject }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:vote]).to be_include "can't be blank"
        end
      end
    end
    context 'with more than the amount of votes permitted' do
      let(:points) {max_points + 18}
      it 'should raise an error' do
        expect { subject }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:points]).to be_include Answer::ERROR_MESSAGE_FOR_OUT_OF_RANGE_POINT
        end
      end
    end
  end
end
