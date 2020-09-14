require 'rails_helper'

RSpec.describe Vote, type: :model do
  context 'When having two different Radars' do
    let!(:a_radar) { create :radar }
    let!(:another_radar) { create :different_radar }
    context 'and a vote have answers from both of them' do
      let(:answers) do
        [
            Answer.new(axis: a_radar.axes.first, radar: a_radar, points: 3),
            Answer.new(axis: another_radar.axes.first, radar: another_radar, points: 3)
        ]
      end
      it 'should err when creating the vote' do
        expect { Vote.create!(answers: answers) }.to raise_error IncompleteVote, Vote::ERROR_MESSAGE_MISSING_AXES
      end
    end
  end
  context 'With a new Radar' do
    let(:a_radar) { create :radar }
    context 'and after a vote' do

      subject do
        Vote.create!(answers: answers)
      end

      context 'with answers for the radar' do
        let(:answers) { a_radar.axes.map { |axis| build :answer, axis: axis, radar: a_radar } }

        it 'All the radar questions should have one answer' do
          subject

          expect(a_radar.times_completed).to eq 1
        end
      end

      context 'with only some answers for the radar' do
        let(:answers) { [build(:answer, axis: a_radar.axes.first, radar: a_radar)] }

        it 'All the radar questions should have one answer' do
          expect { subject }.to raise_error IncompleteVote, Vote::ERROR_MESSAGE_MISSING_AXES
        end
      end

      context 'with no answers' do
        let(:answers) { [] }

        it 'should err when creating the vote' do
          expect { subject }.to raise_error do |error|
            expect(error).to be_a(ActiveRecord::RecordInvalid)
            expect(error.record.errors[:answers]).to be_include Vote::ERROR_MESSAGE_FOR_NO_ANSWERS
          end
        end
      end

      context 'with an answer from a closed Radar' do
        let(:answers) { a_radar.axes.map { |axis| build :answer, axis: axis, radar: a_radar } }

        before do
          a_radar.close
        end

        it 'should err' do
          expect { subject }.to raise_error CannotVoteAClosedRadar, Vote::ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR
        end
      end
      context 'with not all the axes from the radar' do
        let(:answers) { a_radar.axes.map { |axis| build :answer, axis: axis, radar: a_radar }.drop 1 }

        it 'should err' do
          expect { subject }.to raise_error IncompleteVote, Vote::ERROR_MESSAGE_MISSING_AXES
        end
      end
    end
  end
end
