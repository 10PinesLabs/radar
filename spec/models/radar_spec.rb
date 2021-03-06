require 'rails_helper'

RSpec.describe Radar, type: :model do
  context 'When having a new radar' do
    subject { Radar.new }

    context 'without a name' do
      it 'must not be valid' do
        expect(subject.valid?).to be_falsey
      end
    end

    context 'without a description' do
      it 'must have a default description' do
        expect(subject.description).to eq('Sin Descripción')
      end
    end

    #TODO: Move this context to radar template when creating radars from there
    xcontext 'from a radar_template' do
      let(:radar_template) { create :radar_template }

      subject {
        Radar.create!(radar_template_id: radar_template.id, name: 'un radar', description: 'una descripcion')
      }

      it 'should not be empty' do
        is_expected.not_to be_empty
      end

      it 'should be active' do
        is_expected.to be_active
      end

      it 'should have zero value as global average where there are no answers' do
        expect(subject.global_average).to eq 0
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
            expect{subject.close}.to raise_error AlreadyClosedRadarException, Radar::ERROR_MESSAGE_FOR_ALREADY_CLOSED
          end
        end
      end
    end
  end

  context 'When creating a new radar' do
    context 'from no radar template' do
      it 'should raise an error' do
        expect { Radar.create! }.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:radar_template]).to be_include Radar::ERROR_MESSAGE_FOR_RADAR_TEMPLATE_MISSING
        end
      end
    end

    context 'with answers' do
      let!(:a_radar) {create :radar}

      subject {
        vote = Vote.create!(answers: a_radar.axes.map {|axis| Answer.new(axis: axis, points: 1, radar: a_radar)})
        a_radar.update!(answers: vote.answers)
      }

      it 'should have the averaged answers\' points as global average' do
        subject
        expect(a_radar.reload.global_average). to eq 1
      end
    end
  end
end
