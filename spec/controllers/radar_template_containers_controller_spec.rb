require 'rails_helper'

RSpec.describe RadarTemplateContainersController, type: :controller do
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

  def serialized_radar_template_container(radar_template_container)
    {
        'id' => radar_template_container.id,
        'name' => radar_template_container.name,
        'description' => radar_template_container.description,
        'owner' => {'id'=> radar_template_container.owner.id,
                    'name' => radar_template_container.owner.name,
                    'email' => radar_template_container.owner.email,
                    'remaining_containers' => radar_template_container.owner.remaining_containers},
        'users' => serialize_users(radar_template_container.users),
        'radar_templates' => radar_template_container
                                 .radar_templates
                                 .map {|radar_template| serialized_radar_template(radar_template)},
        'active' => radar_template_container.active,
        'created_at' => radar_template_container.created_at.as_json,
        'active_voting_code' => radar_template_container.active_voting_code,
        'pinned'=> radar_template_container.pinned,
        'max_points' => radar_template_container.max_points
    }
  end

  def serialize_users(users)
    users.map do |user| {"id" => user.id, "name" => user.name, "email" => user.email,
                         'remaining_containers' => user.remaining_containers }
    end
  end

  def all_radars_to_be_inactive(container)
    container.radar_templates.all? do |radar_template|
      radar_template.radars.all? do |radar|
        !radar.active
      end
    end
  end

  let(:logged_user){create :user}
  let(:another_user){create :user}
  let(:yet_another_user) {create :user}
  let(:radar_template) { create(:radar_template, owner: logged_user)}
  let(:a_radar_template_container) {radar_template.radar_template_container}
  let(:request_radar_template_container_id) { a_radar_template_container.id }
  let(:max_points) { 10 }
  context 'When logged in as a valid user' do

    before do
      allow(JWT).to receive(:decode).and_return [logged_user.as_json]
    end

    describe '#create' do
      subject do
        post :create, params: radar_template_container_params
      end

      context 'with axes' do
        let(:radar_template_container_params) {
          {
              name: 'New Radar Template', description: 'Radar 2015'
          }
        }

        it 'the request should succeed' do
          expect(subject).to have_http_status :created
        end

        it 'a non empty radar template container should be created' do
          expect{ subject }.to change{RadarTemplateContainer.count}.from(0).to(1)
        end

        it 'the radar template container belongs to the logged user' do
          subject
          expect(RadarTemplateContainer.last.owner_id).to eq logged_user.id
        end

        context "regarding max_points setting" do
          context "if no max_points setting is passed" do
            let(:max_points) { nil }
            it "defaults to 5" do
              subject
              expect(RadarTemplateContainer.first.max_points).to eq 5
            end
          end

          context "if the setting is passed" do
            let(:radar_template_container_params) {
              {
                name: 'New Radar Template', description: 'Radar 2015', max_points: max_points
              }
            }

            context "if a valid value is passed" do
              let(:max_points) {9}
              it "stores it in the RadarTemplateContainer" do
                subject
                expect(RadarTemplateContainer.first.max_points).to eq max_points
              end
            end

            context "if an invalid value is passed" do
              let(:max_points){11}
              it "returns bad request" do
                expect(subject).to have_http_status :bad_request
              end
            end
          end
        end

        context 'when the user has reached the limit of containers' do
          before do
            logged_user.update!(max_containers: 0)
          end

          it 'should not create the container' do
            subject
            expect(logged_user.owned_radar_template_containers.count).to eq 0
          end

          it 'should return forbidden with the correct message' do
            expect(subject).to have_http_status :forbidden
            expect(response.body).to eq "Ya has llegado a tu máximo de containers"
          end

        end

      end

      context 'regarding name' do
        context 'with nil as name' do
          let(:radar_template_container_params) {
            {name: nil, description: 'Radar 2015'}
          }

          it {expect(subject).to have_http_status :bad_request}
        end

        context 'with empty string as name' do
          let(:radar_template_container_params) {
            {name: '', description: 'Radar 2015'}
          }

          it {expect(subject).to have_http_status :bad_request}
        end
      end
    end

    describe '#show' do

      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      subject do
        get :show, params: {id: request_radar_template_container_id}
      end

      context 'that does not exists' do
        let(:request_radar_template_container_id) { -1 }
        it 'should return a not found response' do
          subject
          expect(response).to have_http_status :not_found
        end
      end

      context 'with a user that owns the radar template container' do

        it 'should return an ok status' do
          subject
          expect(response).to have_http_status :ok
        end

        it 'should return the container with all the radar templates information' do
          subject
          expect(JSON.parse(response.body)).to eq serialized_radar_template_container(a_radar_template_container)
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
          allow(JWT).to receive(:decode).and_return [logged_user.as_json]
          post :share, params:{ id: a_radar_template_container.id, users_ids: [shared_user.id]}
          allow(JWT).to receive(:decode).and_return [shared_user.as_json]
        end

        it 'should be able to see the radar template' do
          expect(subject).to have_http_status :ok
        end
      end

      context 'with an inactive a container radar template' do
        let(:radar_template) { create(:radar_template, owner: logged_user, active: false)}

        it 'that radar template is not returned with the container' do
          subject
          expect(JSON.parse(response.body)["radar_templates"]).to eq([])
        end
      end

    end

    describe '#share' do

      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      let(:request_user_id) { another_user.id}
      let(:another_request_user_id) { yet_another_user.id }
      let(:request_users_ids) { [request_user_id, another_request_user_id] }

      subject do
        post :share, params:{  id: request_radar_template_container_id, users_ids: request_users_ids}
      end

      it 'the request should be successful' do
        subject
        expect(response).to have_http_status :ok
      end

      context "when the container id does not exist" do

        let(:request_radar_template_container_id) { -1 }

        it "returns status not found" do
          expect(subject).to have_http_status :not_found
        end
      end

      context "when one of the selected user id does not exist" do

        let(:request_user_id) { -1 }

        it "returns status not found" do
          expect(subject).to have_http_status :not_found
        end

      end

      context "when the logged user does not own the container" do

        before do
          a_radar_template_container.update!(owner: another_user)
        end

        it "returns status unauthorized" do
          expect(subject).to have_http_status :not_found
        end

      end

    end

    describe '#index' do
      let!(:a_radar_template_container) {create :radar_template_container, owner: logged_user}

      subject do
        get :index
      end

      it 'returns ok' do
        expect(subject).to have_http_status :ok
      end

      it 'returns owned radar template containers' do
        subject
        expect(JSON.parse(response.body)).to contain_exactly(serialized_radar_template_container(a_radar_template_container))
      end

      context 'if another user has shared radar templates with the logged user' do
        let(:another_user) {create :user}
        let!(:a_radar_template_container) {create :radar_template_container, owner: another_user}

        before do
          a_radar_template_container.add_user another_user, logged_user
        end

        it 'includes those radar templates in the response' do
          subject
          expect(JSON.parse(response.body)).to contain_exactly(serialized_radar_template_container(a_radar_template_container))
        end
      end

      context 'if a container is inactive' do
        let!(:a_radar_template_container) {create :radar_template_container, owner: logged_user, active: false}
        it 'that container is not shown' do
          subject
          expect(JSON.parse(response.body)).to eq([])
        end
      end
    end

    describe '#close' do
      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      def subject
        delete :destroy, params: {id: a_radar_template_container.id }
      end

      context 'and the container is active' do

        it 'returns status ok' do
          subject
          expect(response).to have_http_status :ok
        end

        it 'the container ends up inactive' do
          expect(a_radar_template_container.active?).to eq true
          subject
          expect(a_radar_template_container.reload.active?).to eq false
        end

        it 'closes all its associated radar templates' do
          expect(a_radar_template_container.radar_templates.all?{|rt| rt.active?}).to be true
          subject
          expect(a_radar_template_container.reload.radar_templates.any?{|rt| rt.active?}).to be false
        end

        context 'and there are active radars' do
          let!(:active_radar) {create(:radar, radar_template: radar_template)}

          it 'closes all its associated radars' do
            subject
            expect(all_radars_to_be_inactive(a_radar_template_container.reload)).to be_truthy
          end
        end
      end

      context 'and the container is inactive' do

        before do
          a_radar_template_container.close logged_user
        end

        it 'returns no content' do
          subject
          expect(response).to have_http_status :ok
        end

        it 'does not change inactive status' do
          expect{subject}.to_not change{a_radar_template_container.active?}
        end
      end
    end

    describe "#clone" do

      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      let(:param_name) { "A name" }
      let(:param_description) { "A description" }
      let(:param_share) { false }
      let(:param_container_id) { a_radar_template_container.id }

      def subject
        post :clone, params: {id: param_container_id, name: param_name,
                              description: param_description, share: param_share}
      end

      it 'returns status created' do
        subject
        expect(response).to have_http_status :created
      end

      it "returns the serialized container" do
        subject
        expect(RadarTemplateContainer.count).to eq 2
        cloned_container = RadarTemplateContainer.last
        expect(JSON.parse(response.body)).to eq serialized_radar_template_container(cloned_container)
      end

      context "if logged user does not own the container" do

        let(:another_user){create :user, name: 'otro pino', provider: 'backoffice'}

        before do
          allow(JWT).to receive(:decode).and_return [another_user.as_json]
        end

        it 'returns not found' do
          subject
          expect(response).to have_http_status(:not_found)
        end
      end

      context "if the container does not exist" do

        let(:param_container_id) { -1 }

        it 'returns not found' do
          subject
          expect(response).to have_http_status(:not_found)
        end

      end

      context "if the name is not passed" do

        let(:param_name) { nil }

        it 'returns bad request' do
          subject
          expect(response).to have_http_status(:bad_request)
        end

        it 'returns an expressive error message' do
          subject
          expect(JSON.parse(response.body)).to eq({"errors"=>["param is missing or the value is empty: name"]})
        end

      end

      context "if the name already exist" do
        let(:param_name) { a_radar_template_container.name }

        it 'returns bad request' do
          subject
          expect(response).to have_http_status(:bad_request)
        end

        it 'returns an expressive error message' do
          subject
          expect(JSON.parse(response.body)).to eq({"errors"=>["has already been taken"]})
        end
      end

    end

    describe "#pin" do

      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      def subject
        get :pin, params: {id: request_radar_template_container_id,
                           pin: pin}
      end

      context 'when request to pin the container' do
        let(:pin){true}

        it 'should return 204' do
          expect(subject).to have_http_status 204
        end

        it 'should be pinned' do
          subject
          expect(a_radar_template_container.reload.pinned).to eq true
        end
      end

      context 'when request to unpin the container' do
        let(:pin){false}

        it 'should return 204' do
          expect(subject).to have_http_status 204
        end

        it 'should be unpinned' do
          subject
          expect(a_radar_template_container.reload.pinned).to eq false
        end
      end
    end

    describe "#update_name" do
      let(:a_new_name) {'Un nuevo nombre'}
      let(:radar_template_container_params) {{id: a_radar_template_container.id, name: a_new_name}}

      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      subject do
        put :edit, params: radar_template_container_params
      end

      it 'should return an ok status' do
        subject
        expect(response).to have_http_status :ok
      end

      it 'updates radar template container name' do
        subject
        container = RadarTemplateContainer.find(a_radar_template_container.id)
        expect(container.name).to eq(a_new_name)
      end
    end
  end
end
