require 'rails_helper'

RSpec.describe RadarsController, type: :controller do
  context 'When requesting to create a new radar' do
    before do
      post :create, radar_params
    end

    context 'with axes' do
      let(:an_axis) { Axis.create!(description: 'Una Arista guardada') }
      let(:radar_params) { {axes: [{description: 'Esto es una arista nueva del nuevo radar'}, {id: an_axis.id}]} }

      it 'the request should succeed' do
        expect(response).to have_http_status :ok
      end

      it 'a non empty radar should be created' do
        expect(Radar.count).to be 1
      end

      it 'the radar should have the 2 axes' do
        expect(Radar.last.amount_of_questions).to eq 2
      end

    end
  end
end
