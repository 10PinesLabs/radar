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
      let(:a_radar) { create :radar }

      context 'and the answers are all from that radar' do
        it 'a new vote should be created' do
          request_to_create_vote(a_radar.id, a_radar.axes)
          expect(Vote.count).to be 1
        end
      end

      context 'and the answers are from different radars' do
        let(:another_radar) { create :radar }

        it 'should return an unprocessable entity' do
          request_to_create_vote(a_radar.id, a_radar.axes + another_radar.axes)
          expect(response).to have_http_status :unprocessable_entity
        end
      end
    end
  end
end
