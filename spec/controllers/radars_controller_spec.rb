require 'rails_helper'

RSpec.describe RadarsController, type: :controller do
  def serialized_axis(radar, axis)
    {'id' => axis.id, 'name' => axis.name, 'description' => axis.description,
     'answers' => Answer.where(axis: axis, radar: radar).map {|answer| serialized_answer(answer)}}
  end

  def serialized_answer(answer)
    {'points' => answer.points, 'axis_id' => answer.axis_id}
  end

  def serialized_axis_result(radar, axis)
    {'axis' => serialized_axis(radar, axis), 'points' => Answer.where(axis: axis, radar: radar).map(&:points)}
  end

  def serialized_radar_result(radar)
    {'radar' => serialized_radar(radar), 'axes_results' => radar.axes.map {|axis| serialized_axis_result(radar, axis)}}
  end

  def serialized_radar(radar)
    {
      'id' => radar.id,
      'axes' => radar.axes.map {|axis| serialized_axis(radar, axis)},
      'name' => radar.name,
      'description' => radar.description,
      'active' => radar.active,
      'created_at' => radar.created_at.as_json
    }
  end

  context 'When logged in as a valid user' do
    before do
      allow(controller).to receive(:ensure_authenticated!) { true }
    end
    context 'When requesting to create a new radar' do
      subject do
        post :create, params: radar_params
      end

      let(:radar_template) { create :radar_template }
      let(:radar_template_id) { radar_template.id }

      context 'with axes' do
        let(:radar_params) {
          { name: 'New Radar', description: 'Radar 2015', radar_template_id: radar_template_id}
        }

        it 'the request should succeed' do
          expect(subject).to have_http_status :created
        end

        it 'a non empty radar should be created' do
          subject
          expect(Radar.count).to eq 1
        end

        it 'the radar should have the same amount of radar template axes' do
          subject
          expect(Radar.last.axes.count).to eq radar_template.axes.count
        end
      end

      context 'without a name' do
        let(:radar_params) {
          {description: 'Radar 2015'}
        }

        it 'should be a bad request' do
          expect(subject).to have_http_status :bad_request
        end
      end

      context 'with name' do
        context 'with nil as name' do
          let(:radar_params) {
            {name: nil, description: 'Radar 2015'}
          }

          it {expect(subject).to have_http_status :bad_request}
        end

        context 'with empty string as name' do
          let(:radar_params) {
            {name: '', description: 'Radar 2015'}
          }

          it {expect(subject).to have_http_status :bad_request}
        end
      end
    end

    context 'When requesting to get the results of a radar' do
      let!(:a_radar) {create :radar}

      before do
        Vote.create!(answers: a_radar.axes.map {|axis| Answer.new(axis: axis, points: 4, radar: a_radar)})
        Vote.create!(answers: a_radar.axes.map {|axis| Answer.new(axis: axis, points: 3, radar: a_radar)})
        get :result, params: {id: a_radar.id}
      end

      it 'the result should be the radar result serialized' do
        expect(JSON.parse(response.body)).to eq serialized_radar_result(a_radar)
      end

    end

    context 'When requesting to show a radar' do
      context 'that does not exists' do
        it 'should return a not found response' do
          get :show, params: {id: -1}
          expect(response).to have_http_status :not_found
        end
      end

      let(:a_radar) {create :radar}

      before do
        get :show, params: {id: a_radar.id}
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
        post :close, params: {id: a_radar.id}
      end

      let!(:a_radar) {create :radar}

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
          it 'should be idempotent by not returning any errors' do
            request_close_radar
            expect(response).to have_http_status :ok
          end
        end
      end
    end
  end
end
