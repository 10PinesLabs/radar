require 'rails_helper'

RSpec.describe VotesController, type: :controller do
  context 'When requesting to create a vote' do
    before do
      post :create, {
          radar_id: a_radar.id,
          answers: a_radar.axes.map { |axis| {axis_id: axis.id, points: 3} }
      }
    end
    context 'for a certain radar with axes' do
      let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
      let(:a_radar) { Radar.create_with_axes(axes) }

      it 'a new vote should be created' do
        expect(Vote.count).to be 1
      end

      it 'All the radar questions should have one answer' do
        expect(a_radar.times_completed).to eq 1
      end
    end
  end
end
