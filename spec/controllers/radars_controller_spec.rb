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
        expect(Radar.last.amount_of_axes).to eq 2
      end
    end

    context 'with no axes' do
      let(:radar_params) { {axes: []} }
      it 'should return bad request' do
        expect(response).to have_http_status :bad_request
      end
    end
  end

  context 'When requesting to show a radar' do
    context 'that does not exists' do
      it 'should return a not found response' do
        get :show, {id: -1}
        expect(response).to have_http_status :not_found
      end
    end

    let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
    let(:a_radar) { Radar.create_with_axes(axes) }
    let(:serialized_axes) { axes.map { |axis| {'id' => axis.id, 'description' => axis.description} } }
    let(:serialized_radar) { {'id' => a_radar.id, 'axes' => serialized_axes, 'active' => true} }
    before do
      get :show, {id: a_radar.id}
    end

    it 'should return an ok status' do
      expect(response).to have_http_status :ok
    end

    it 'should return the radar' do
      expect(JSON.parse(response.body)).to eq serialized_radar
    end
  end

  context 'When requesting to close a radar' do

    def request_close_radar
      post :close, {id: a_radar.id}
    end

    let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
    let!(:a_radar) { Radar.create_with_axes(axes) }

    context 'and the radar is active' do
      before :each do
        request_close_radar
        a_radar.reload
      end

      it 'should respond the request with an ok status' do
        expect(response).to have_http_status :ok
      end
      it 'the radar should not be active' do
        expect(a_radar).not_to be_active
      end

      context 'and you request to close it again' do
        it 'should return unprocessable entity' do
          request_close_radar
          expect(response).to have_http_status :unprocessable_entity
        end
      end
    end
  end
end
