require 'rails_helper'

RSpec.describe Vote, type: :model do
  context 'When having two different Radars' do
    let!(:a_radar) { create :radar }
    let!(:another_radar) { create :radar }
    context 'and a vote have answers from both of them' do
      let(:answers) do
        (a_radar.axes + another_radar.axes).map { |axis| Answer.new(axis: axis, points: 3) }
      end
      it 'should err when creating the vote' do
        expect { Vote.create!(answers: answers) }.to raise_error CannotVoteInDifferentRadars, Vote::ERROR_MESSAGE_FOR_ANSWERS_FROM_DIFFERENT_RADARS
      end
    end
  end
  context 'With a new Radar' do
    let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
    let(:a_radar) { Radar.create_with_axes(axes) }
    context 'and after a vote' do
      context 'with answers for the radar' do
        before :each do
          answers = a_radar.axes.map { |axis| Answer.new(axis: axis, points: 3) }
          Vote.create!(answers: answers)
        end

        it 'All the radar questions should have one answer' do
          expect(a_radar.times_completed).to eq 1
        end
      end
      context 'with only some answers for the radar' do
        let(:answers) { [Answer.new(axis: a_radar.axes.first, points: 3)] }

        it 'All the radar questions should have one answer' do
          expect { Vote.create!(answers: answers) }.to raise_error IncompleteVote, Vote::ERROR_MESSAGE_FOR_INCOMPLETE_VOTE
        end
      end
      context 'with no answers' do
        it 'should err when creating the vote' do
          expect { Vote.create! }.to raise_error do |error|
            expect(error).to be_a(ActiveRecord::RecordInvalid)
            expect(error.record.errors[:answers]).to be_include Vote::ERROR_MESSAGE_FOR_NO_ANSWERS
          end
        end
      end
      context 'with an axis from a closed Radar' do
        let(:axis) { Axis.new(description: 'ble') }
        let(:a_radar) { Radar.create_with_axes([axis]) }
        let(:answer) { Answer.new(axis: axis, points: 3) }
        before :each do
          a_radar.close
        end
        it 'should err' do
          expect { Vote.create!(answers: [answer]) }.to raise_error CannotVoteAClosedRadar, Vote::ERROR_MESSAGE_CANNOT_ANSWER_CLOSED_RADAR
        end
      end
    end
  end
end