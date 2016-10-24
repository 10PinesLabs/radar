require 'rails_helper'

RSpec.describe Radar, type: :model do
  context 'When having a new radar' do
    subject { Radar.new }
    it 'should be empty' do
      is_expected.to be_empty
    end

    context 'and you add an axis to that radar' do
      let(:an_axis) { Axis.new }
      before do
        subject.add(an_axis)
      end

      it 'should not be empty' do
        is_expected.not_to be_empty
      end

      it 'should not be empty' do
        is_expected.to be_active
      end

      context 'and you close the radar' do
        before :each do
          subject.close
        end

        it 'should be closed' do
          is_expected.not_to be_active
        end
        context 'and you try to close it again' do
          it 'should err' do
            expect{subject.close}.to raise_error Radar::ERROR_MESSAGE_FOR_ALREADY_CLOSED
          end
        end
      end
    end
  end

  context 'When creating a new radar' do
    context 'with no axes' do
      it 'should raise an error' do
        expect { Radar.create! }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:axes]).to be_include Radar::ERROR_MESSAGE_FOR_NO_QUESTIONS
        end
      end
    end
  end
end
