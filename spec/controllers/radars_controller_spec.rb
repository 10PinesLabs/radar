require 'rails_helper'

RSpec.describe RadarsController, type: :controller do
  context 'When requesting to create a new radar' do
    before do
      post :create, radar_params
    end

    context 'with axes' do
      let(:radar_params) {
        {axes: [{description: 'Esto es una arista nueva del nuevo radar'}, {description: 'Una Arista guardada'}]}
      }

      it 'the request should succeed' do
        expect(response).to have_http_status :created
      end

      it 'a non empty radar should be created' do
        expect(Radar.count).to be 1
      end

      it 'the radar should have the 2 axes' do
        expect(Radar.last.amount_of_questions).to eq 2
      end

    end
  end

  context 'When requesting to show a radar' do
    let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
    let(:a_radar) { Radar.create_with_axes(axes) }
    let(:expected_radar) { a_radar.to_json }
    before do
      get :index, {id: a_radar.id}
    end

    it 'should return an ok status' do
      expect(response).to have_http_status :ok
    end

    it 'should return the radar' do
      expect(JSON.parse(response.body)).to eq JSON.parse(expected_radar)
    end
  end
end
