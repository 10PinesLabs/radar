require 'rails_helper'

RSpec.describe RadarsController, type: :controller do
  def serialized_axis(axis)
    {'id' => axis.id, 'description' => axis.description}
  end

  def serialized_axis_result(axis)
    {'axis' => serialized_axis(axis), 'points' => axis.answers.map(&:points)}
  end

  def serialized_radar_result(radar)
    {'radar_id' => radar.id, 'axes_results' => radar.axes.map { |axis| serialized_axis_result(axis) }}
  end

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

  context 'When requesting to get the results of a radar' do
    let!(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
    let!(:a_radar) { Radar.create_with_axes(axes) }

    before do
      Vote.create!(answers: axes.map { |axis| Answer.new(axis: axis, points: 4) })
      Vote.create!(answers: axes.map { |axis| Answer.new(axis: axis, points: 3) })
      get :result, {id: a_radar.id}
    end

    it 'the result should be the radar result serialized' do
      expect(JSON.parse(response.body)).to eq serialized_radar_result(a_radar)
    end

  end

  context 'When requesting to show a radar' do
    let(:axes) { [Axis.new(description: 'ble'), Axis.new(description: 'bla')] }
    let(:a_radar) { Radar.create_with_axes(axes) }
    let(:serialized_axes) { axes.map { |axis| {'id' => axis.id, 'description' => axis.description} } }
    let(:serialized_radar) { {'id' => a_radar.id, 'axes' => serialized_axes} }
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
end
