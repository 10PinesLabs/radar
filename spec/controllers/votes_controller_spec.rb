require 'rails_helper'

RSpec.describe VotesController, type: :controller do

  context 'When requesting to create a vote' do

    subject do
      post :create, params: {
          radar_template_id: radar_template.id,
          answers: voted_axes.map { |axis| {axis: {id: axis.id}, points: 3} }
      }
    end


    context 'for a certain radar template with axes' do
      let(:a_radar) { create :radar }
      let(:radar_template) { a_radar.radar_template}
      let(:voted_axes) { radar_template.axes}

      context 'and the answers are all from that radar template' do
        it 'a new vote should be created' do
          subject
          expect(Vote.count).to eq 1
        end
      end

      context 'and the answers are from different radars' do
        let(:another_radar) { create :different_radar }
        let(:another_template) { another_radar.radar_template }
        let(:voted_axes){ another_template.axes}

        it 'should return an unprocessable entity' do
          subject
          expect(response).to have_http_status :unprocessable_entity
        end
      end

      context 'when the radar is inactive' do

        before do
          a_radar.active = false
          a_radar.save!
        end

        it 'should return an unprocessable entity' do
          expect(subject).to have_http_status :unprocessable_entity
          end
      end



    end
    tallarin
    context 'when there is no radar for the radar template' do
      let(:radar_template){ create :radar_template}
      let(:voted_axes){ radar_template.axes}
      un tallarin que se mueve por aqui que se mueve por aca
      it 'should return not found' do
        expect(subject).to have_http_status :not_found
      end
    end
  end

end
