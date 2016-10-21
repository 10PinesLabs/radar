require 'rails_helper'

RSpec.describe Vote, type: :model do
  context 'With a new Radar' do
    let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
    let(:a_radar) { Radar.create_with_axes(axes) }
    context 'and after a vote' do
      before :each do
        answers = a_radar.axes.map { |axis| Answer.new(axis: axis, points: 3) }
        Vote.create!(answers: answers)
      end

      it 'All the radar questions should have one answer' do
        expect(a_radar.times_completed).to eq 1
      end
    end
  end
end
