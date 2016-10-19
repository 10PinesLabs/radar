require 'rails_helper'

RSpec.describe RadarsController, type: :controller do
  context 'When requesting to create a new radar' do
    let(:an_axis) { Axis.create!(description: 'Una Arista guardada') }
    before do
      post :create, {axes: [{description: 'Esto es una arista nueva del nuevo radar'}, {id: an_axis.id}]}
    end

    it 'the request should succeed' do
      expect(response).to have_http_status :ok
    end

    it 'a non empty radar should be created' do
      expect(Radar.count).to be 1
    end
  end
end
