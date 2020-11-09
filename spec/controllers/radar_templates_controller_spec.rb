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

  def serialized_radar_template(radar_template, user)
    {
        'id' => radar_template.id,
        'radars' => radar_template.radars.map {|axis| serialized_radar(axis)},
        'axes' => radar_template.axes.map {|axis| short_axis_serialization(axis)},
        'name' => radar_template.name,
        'description' => radar_template.description,
        'active' => radar_template.active,
        'created_at' => radar_template.created_at.as_json,
        'is_owner' => radar_template.is_owned_by?(user)
    }
  end

  let(:logged_user){create :user}

  context 'When logged in as a valid user' do

    before do
      allow(JWT).to receive(:decode).and_return [logged_user.as_json]
    end

    context 'When requesting to create a new radar template' do
      let(:radar_template_container) { create(:radar_template_container, owner: logged_user)}

      subject do
        post :create, params: radar_template_params
      end

      context 'with axes' do
        let(:radar_template_params) {
          {name: 'New Radar Template', description: 'Radar 2015',
           radar_template_container_id: radar_template_container.id,
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

        it 'the radar template belongs to the logged user' do
          subject
          expect(RadarTemplate.last.owner_id).to eq logged_user.id
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
          {description: 'Radar 2015',
           radar_template_container_id: radar_template_container.id,
           axes: [{name: 'Nombre primera arista', description: 'Esto es una arista nueva del nuevo radar'}, {name: 'Nombre segunda arista', description: 'Una Arista guardada'}]}
        }

        it 'should be a bad request' do
          expect(subject).to have_http_status :bad_request
        end
      end

      context 'without a container' do
        let(:radar_template_params) {
          {description: 'Radar 2015',
           axes: [{name: 'Nombre primera arista',
                   description: 'Esto es una arista nueva del nuevo radar'},
                  {name: 'Nombre segunda arista', description: 'Una Arista guardada'}]}
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
      let(:a_radar_template) {create :radar_template, owner: logged_user}

      subject do
        get :show, params: {id: a_radar_template.id}
      end

      context 'that does not exists' do
        it 'should return a not found response' do
          get :show, params: {id: -1}
          expect(response).to have_http_status :not_found
        end
      end

      context 'with a user that owns the radar template' do

        it 'should return an ok status' do
          subject
          expect(response).to have_http_status :ok
        end

        it 'should return the radar' do
          subject
          expect(JSON.parse(response.body)).to eq serialized_radar_template(a_radar_template, logged_user)
        end
      end

      context 'with a user that do not owns the radar template' do
        let(:another_user){create :user, name: 'otro pino', provider: 'backoffice'}

        before do
          allow(JWT).to receive(:decode).and_return [another_user.as_json]
        end

        it 'should return not found' do
          subject
          expect(response).to have_http_status(:not_found)
        end
      end

      context 'with a user that the radar has been shared to' do
        let(:shared_user){create :user}

        before do
          post :share, params:{ id: a_radar_template.id, user_id: shared_user.id}
          allow(JWT).to receive(:decode).and_return [shared_user.as_json]
        end

        it 'should be able to see the radar template' do
          expect(subject).to have_http_status :ok
        end
      end
    end

    context 'when requesting to share a radar' do

      let(:radar_template){create :radar_template, owner: logged_user}
      let(:another_user){create :user}

      def compartir
        post :share, params:{  id: radar_template.id, user_id: another_user.id}
      end

      it 'the request should be successful' do
        compartir
        expect(response).to have_http_status :ok
      end

      context 'as shared radar user' do
        before do
          compartir
          allow(JWT).to receive(:decode).and_return [another_user.as_json]
        end

        it 'should return unauthorized' do
          compartir
          expect(response).to have_http_status :unauthorized
        end
      end

      context 'as a user not knower of radar template' do

        before do
          allow(JWT).to receive(:decode).and_return [another_user.as_json]
        end

        it 'should return not found' do
          compartir
          expect(response).to have_http_status :not_found
        end

      end

    end

    context 'when requesting to list available templates' do
      let!(:a_radar_template) {create :radar_template, owner: logged_user}

      subject do
        get :index
      end

      it 'returns ok' do
        expect(subject).to have_http_status :ok
      end

      it 'returns owned templates' do
        subject
        expect(JSON.parse(response.body)).to contain_exactly(serialized_radar_template(a_radar_template, logged_user))
      end

      context 'if another user has shared radar templates with the logged user' do
        let(:another_user) {create :user}
        let!(:a_radar_template) {create :radar_template, owner: another_user}

        before do
          a_radar_template.add_user another_user, logged_user
        end

        it 'includes those radar templates in the response' do
          subject
          expect(JSON.parse(response.body)).to contain_exactly(serialized_radar_template(a_radar_template, logged_user))
        end
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

    describe '#delete' do
      let!(:a_radar_template) {create :radar_template, owner: logged_user}

      subject do
        delete :destroy, params: {id: a_radar_template.id}
      end

      it 'returns ok' do
        subject
        expect(subject).to have_http_status :ok
      end

      it 'removes radar template from active ones' do
        subject
        a_radar_template.reload
        expect(a_radar_template.active).to be_falsey
      end
    end
  end
end
