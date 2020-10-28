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

  def serialized_radar_template_container(radar_template_container, user)
    {
        'id' => radar_template_container.id,
        'name' => radar_template_container.name,
        'description' => radar_template_container.description,
        'is_owner' => radar_template_container.is_owned_by?(user),
        'radar_templates' => radar_template_container
                                 .radar_templates
                                 .map {|radar_template| serialized_radar_template(radar_template, user)},
        'active' => radar_template_container.active,
        'created_at' => radar_template_container.created_at.as_json,
        'active_voting_code' => radar_template_container.active_voting_code
    }
  end

  let(:logged_user){create :user}
  let(:another_user){create :user}

  let(:radar_template) { create(:radar_template, owner: logged_user)}
  let(:a_radar_template_container) {radar_template.radar_template_container}
  let(:request_radar_template_container_id) { a_radar_template_container.id }

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
          expect(JSON.parse(response.body)).to eq serialized_radar_template_container(a_radar_template_container, logged_user)
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
          post :share, params:{ id: a_radar_template_container.id, user_id: shared_user.id}
          allow(JWT).to receive(:decode).and_return [shared_user.as_json]
        end

        it 'should be able to see the radar template' do
          expect(subject).to have_http_status :ok
        end
      end

    end

    describe '#share' do

      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      let(:request_user_id) { another_user.id}

      subject do
        post :share, params:{  id: request_radar_template_container_id, user_id: request_user_id}
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

      context "when the selected user id does not exist" do

        let(:request_user_id) { -1 }

        it "returns status not found" do
          expect(subject).to have_http_status :not_found
        end

      end

      context "when the logged ser does not own the container" do

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
        expect(JSON.parse(response.body)).to contain_exactly(serialized_radar_template_container(a_radar_template_container, logged_user))
      end

      context 'if another user has shared radar templates with the logged user' do
        let(:another_user) {create :user}
        let!(:a_radar_template_container) {create :radar_template_container, owner: another_user}

        before do
          a_radar_template_container.add_user another_user, logged_user
        end

        it 'includes those radar templates in the response' do
          subject
          expect(JSON.parse(response.body)).to contain_exactly(serialized_radar_template_container(a_radar_template_container, logged_user))
        end
      end
    end

    describe '#close' do
      before do
        a_radar_template_container.update!(owner: logged_user)
      end

      def subject
        post :close, params: {id: a_radar_template_container.id}
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
  end
end
