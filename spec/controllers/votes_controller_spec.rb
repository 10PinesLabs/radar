require 'rails_helper'

RSpec.describe VotesController, type: :controller do
  context 'When requesting to create a vote' do
    before do
      post :create, {
          radar_id: a_radar.id,
          answers: axes.map { |axis| {axis_id: axis.id, points: 3} }
      }
    end
    context 'for a certain radar with axes' do
      let(:axes) { [Axis.create!(description: 'ble'), Axis.create!(description: 'bla')] }
      let(:a_radar) { Radar.create_with_axes(axes) }

      it '' do
        expect(Vote.count).to be 1
      end
    end
  end
end
