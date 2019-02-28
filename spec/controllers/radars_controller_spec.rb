require 'rails_helper'

RSpec.describe RadarsController, type: :controller do
  def serialized_axis(axis)
    { 'id' => axis.id, 'name' => axis.name, 'description' => axis.description, 'answers' => axis.answers.map { |answer| serialized_answer(answer)} }
  end

  def serialized_answer(answer)
    { 'points' => answer.points, 'axis_id' => answer.axis_id }
  end

  def serialized_axis_result(axis)
    { 'axis' => serialized_axis(axis), 'points' => axis.answers.map(&:points) }
  end

  def serialized_radar_result(radar)
    { 'radar' => serialized_radar(radar), 'axes_results' => radar.axes.map { |axis| serialized_axis_result(axis) } }
  end

  def serialized_radar(radar)
    {
        'id' => radar.id,
        'axes' => radar.axes.map{ |axis| serialized_axis(axis) },
        'name' => radar.name,
        'description' => radar.description,
        'active' => radar.active,
        'created_at' => radar.created_at.as_json
    }
  end

  context 'When requesting to create a new radar' do
    subject { post :create, radar_params }

    context 'with axes' do
      let(:radar_params) {
        { name: 'New Radar', description: 'Radar 2015',
          axes: [
            { name: 'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar' },
            { name: 'Nombre segunda arista', description: 'Una Arista guardada' }
          ]
        }
      }

      it 'the request should succeed' do
        expect(subject).to have_http_status :created
      end

      it 'a non empty radar should be created' do
        subject
        expect(Radar.count).to be 1
      end

      it 'the radar should have the 2 axes' do
        subject
        expect(Radar.last.amount_of_axes).to eq 2
      end
    end

    context 'with no axes' do
      let(:radar_params) { { axes: [] } }
      it 'should return bad request' do
        expect(subject).to have_http_status :bad_request
      end
    end

    context 'without a name' do
      let(:radar_params) {
        { description: 'Radar 2015', axes: [{ name:'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar' }, { name: 'Nombre segunda arista', description: 'Una Arista guardada' }] }
      }

      it 'should be a bad request' do
        expect(subject).to have_http_status :bad_request
      end
    end

    context 'with name' do
      context 'with nil as name' do
        let(:radar_params) {
          { name: nil, description: 'Radar 2015', axes: [{ name:'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar' }, { name: 'Nombre segunda arista', description: 'Una Arista guardada' }] }
        }

        it { expect(subject).to have_http_status :bad_request }
      end

      context 'with empty string as name' do
        let(:radar_params) {
          { name: '', description: 'Radar 2015', axes: [{ name:'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar' }, { name:'Nombre primera arista', description: 'Una Arista guardada' }] }
        }

        it { expect(subject).to have_http_status :bad_request }
      end
    end
  end

  context 'When requesting to get the results of a radar' do
    let!(:a_radar) { create :radar }

    before do
      Vote.create!(answers: a_radar.axes.map { |axis| Answer.new(axis: axis, points: 4) })
      Vote.create!(answers: a_radar.axes.map { |axis| Answer.new(axis: axis, points: 3) })
      get :result, { id: a_radar.id }
    end

    it 'the result should be the radar result serialized' do
      expect(JSON.parse(response.body)).to eq serialized_radar_result(a_radar)
    end

  end

  context 'When requesting to show a radar' do
    context 'that does not exists' do
      it 'should return a not found response' do
        get :show, { id: -1 }
        expect(response).to have_http_status :not_found
      end
    end

    let(:a_radar) { create :radar }

    before do
      get :show, { id: a_radar.id }
    end

    it 'should return an ok status' do
      expect(response).to have_http_status :ok
    end

    it 'should return the radar' do
      expect(JSON.parse(response.body)).to eq serialized_radar(a_radar)
    end
  end

  context 'When requesting to close a radar' do

    def request_close_radar
      post :close, { id: a_radar.id }
    end

    let!(:a_radar) { create :radar }

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
