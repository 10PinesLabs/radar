require 'rails_helper'

RSpec.describe VotesController, type: :controller do

  def request_to_create_vote(radar_id, axes)
    post :create, {
        radar_id: radar_id,
        answers: axes.map { |axis| {axis: {id: axis.id}, points: 3} }
    }
  end

  context 'When requesting to create a vote' do
    context 'for a certain radar with axes' do
      let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
      let(:a_radar) { Radar.create_with_axes(axes) }

      context 'and the answers are all from that radar' do
        it 'a new vote should be created' do
          request_to_create_vote(a_radar.id, a_radar.axes)
          expect(Vote.count).to be 1
        end
      end
      context 'and the answers are from different radars' do
        let(:another_axis) { Axis.new(description: 'blo') }
        let(:mixed_axis) {[axes.first, another_axis]}
        let(:a_radar) { Radar.create_with_axes([another_axis]) }
        it 'should return a bad request' do
          request_to_create_vote(a_radar.id, mixed_axis)
          expect(response).to have_http_status :bad_request
        end
      end
    end
  end
end
