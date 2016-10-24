require 'rails_helper'

RSpec.describe VotesController, type: :controller do

  def request_to_create_vote
    post :create, {
        radar_id: a_radar.id,
        answers: a_radar.axes.map { |axis| {axis: {id: axis.id}, points: 3} }
    }
  end

  context 'When requesting to create a vote' do
    context 'for a certain radar with axes' do
      let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
      let(:a_radar) { Radar.create_with_axes(axes) }

      it 'a new vote should be created' do
        request_to_create_vote
        expect(Vote.count).to be 1
      end
    end
  end
end
