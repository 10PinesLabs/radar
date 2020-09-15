require 'rails_helper'

RSpec.describe RadarTemplatesController, type: :controller do
  def serialized_axis(radar, axis)
    {'id' => axis.id, 'name' => axis.name, 'description' => axis.description,
     'answers' => Answer.where(axis: axis, radar: radar).map {|answer| serialized_answer(answer)}}
  end

  def serialized_answer(answer)
    {'points' => answer.points, 'axis_id' => answer.axis_id}
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

  def short_axis_serialization(axis)
    {
        'id' => axis.id,
        'name' => axis.name,
        'description' => axis.description,
    }
  end

  def serialized_radar_template(radar_template)
    {
        'id' => radar_template.id,
        'radars' => radar_template.radars.map {|axis| serialized_radar(axis)},
        'axes' => radar_template.axes.map {|axis| short_axis_serialization(axis)},
        'name' => radar_template.name,
        'description' => radar_template.description,
        'active' => radar_template.active,
        'created_at' => radar_template.created_at.as_json
    }
  end

  context 'When logged in as a valid user' do
    before do
      allow(controller).to receive(:ensure_authenticated!) { true }
    end
    context 'When requesting to create a new radar template' do
      subject do
        post :create, params: radar_template_params
      end

      context 'with axes' do
        let(:radar_template_params) {
          {name: 'New Radar Template', description: 'Radar 2015',
           axes: [
             {name: 'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar'},
             {name: 'Nombre segunda arista', description: 'Una Arista guardada'}
           ]
          }
        }

        it 'the request should succeed' do
          expect(subject).to have_http_status :created
        end

        it 'a non empty radar should be created' do
          subject
          expect(RadarTemplate.count).to eq 1
        end

        it 'the radar should have the 2 axes' do
          subject
          expect(RadarTemplate.last.amount_of_axes).to eq 2
        end
      end

      context 'with no axes' do
        let(:radar_template_params) {{axes: []}}
        it 'should return bad request' do
          expect(subject).to have_http_status :bad_request
        end
      end

      context 'without a name' do
        let(:radar_template_params) {
          {description: 'Radar 2015', axes: [{name: 'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar'}, {name: 'Nombre segunda arista', description: 'Una Arista guardada'}]}
        }

        it 'should be a bad request' do
          expect(subject).to have_http_status :bad_request
        end
      end

      context 'with name' do
        context 'with nil as name' do
          let(:radar_template_params) {
            {name: nil, description: 'Radar 2015', axes: [{name: 'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar'}, {name: 'Nombre segunda arista', description: 'Una Arista guardada'}]}
          }

          it {expect(subject).to have_http_status :bad_request}
        end

        context 'with empty string as name' do
          let(:radar_template_params) {
            {name: '', description: 'Radar 2015', axes: [{name: 'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar'}, {name: 'Nombre primera arista', description: 'Una Arista guardada'}]}
          }

          it {expect(subject).to have_http_status :bad_request}
        end
      end
    end

    xcontext 'When requesting to get the results of a radar template' do
      let!(:a_radar) {create :radar}
      let(:a_radar_template) {create :radar_template}

      before do
        Vote.create!(answers: a_radar.axes.map {|axis| Answer.new(axis: axis, points: 4)})
        Vote.create!(answers: a_radar.axes.map {|axis| Answer.new(axis: axis, points: 3)})
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

      let(:a_radar_template) {create :radar_template}

      before do
        get :show, params: {id: a_radar_template.id}
      end

      it 'should return an ok status' do
        expect(response).to have_http_status :ok
      end

      it 'should return the radar' do
        expect(JSON.parse(response.body)).to eq serialized_radar_template(a_radar_template)
      end
    end

    xcontext 'When requesting to close a radar' do

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
          it 'should return unprocessable entity' do
            request_close_radar
            expect(response).to have_http_status :unprocessable_entity
          end
        end
      end
    end
  end
end