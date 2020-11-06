require 'rails_helper'

RSpec.describe VotingsController, type: :controller do
  include ActiveSupport::Testing::TimeHelpers
  let!(:logged_user){create :user}
  let(:another_user){create :user, name: 'otro pino', provider: 'backoffice'}

  let(:name){ 'Un nuevo voting'}
  let(:ends_at) { DateTime.now + 1.day}
  let(:radar_template) { create(:radar_template, owner: logged_user)}
  let(:a_radar_template_container) {radar_template.radar_template_container}

  def freeze_time
    travel_to(Time.now)
  end

  before(:each) do
    freeze_time
    a_radar_template_container.update!(owner: logged_user)
    allow(JWT).to receive(:decode).and_return [logged_user.as_json]
  end

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
        'is_owner' => radar_template.is_owned_by?(user),
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

  def serialized_voting(voting, user)
    {
        'id' => voting.id,
        'code' => voting.code,
        'ends_at' => voting.ends_at.as_json,
        'radar_template_container' => serialized_radar_template_container(voting.radar_template_container, user)
    }
  end

  describe "#create" do

    let(:passed_params) do
      {radar_template_container_id: a_radar_template_container.id, name: name, ends_at: ends_at}
    end

    subject do
      post :create, params: passed_params
    end

    context 'when making a request to create a new voting is successful' do

      it 'the request succeeds with created status' do
        expect(subject).to have_http_status :created
      end

      it 'the response contains the code, id and ends_at date of the voting, plus its radar template container' do
        subject
        expect(JSON.parse(response.body)).to eq(serialized_voting(Voting.first, logged_user))
      end

    end

    context 'when the passed radar template container does not exist' do

      let(:passed_params) do
        {radar_template_container_id: -1, name: name, ends_at: ends_at}
      end

      it 'the request fails with not found status' do
        expect(subject).to have_http_status :not_found
      end

    end

    context 'when the logged user does not have access to the container' do

      before do
        allow(JWT).to receive(:decode).and_return [another_user.as_json]
      end

      it 'returns not found status' do
        expect(subject).to have_http_status :not_found
      end
    end
  end

  describe "#show_by_code" do

    subject do
      get :show_by_code, params: {code: passed_code}
    end

    context 'when the voting with the passed code exists' do

      let(:voting) { Voting.generate!(a_radar_template_container, "A name", ends_at)}
      let(:passed_code) {voting.code}

      it 'the request succeeds with ok status' do
        expect(subject).to have_http_status :ok
      end

      it 'the response contains the code, id and ends_at date of the voting, plus its radar template container' do
        subject
        expect(JSON.parse(response.body)).to eq(serialized_voting(Voting.first, nil))
      end

    end


    context 'when the voting with the passed code does not exist' do

      let(:voting) { Voting.generate!(a_radar_template_container, "A name", ends_at)}
      let(:passed_code) {'Not existent code'}

      it 'the request returns not found' do
        expect(subject).to have_http_status :not_found
      end

    end

  end

  describe "#close" do
    let(:body_params){{radar_template_container_id: a_radar_template_container.id}}
    subject do
      put :close, params: body_params
    end

    context 'when there are no active votings' do
      it 'the request returns not found' do
        expect(subject).to have_http_status :not_found
      end
    end

    context 'when the radar template container is non existent' do
      let(:body_params){{radar_template_container_id: -1}}

      it 'the request returns not found' do
        expect(subject).to have_http_status :not_found
      end
    end

    context 'when there is an active voting associated to the container' do
      let!(:voting) { Voting.generate!(a_radar_template_container, "A name", DateTime.now + 5.days)}


      it 'the voting is successfully closed' do
        expect(subject).to have_http_status :ok
        expect(voting.reload.active?).to eq(false)
        expect(voting.ends_at).to eq(DateTime.now)
      end
    end

    context 'when the user doesn\'t know the container' do
      let!(:voting) { Voting.generate!(a_radar_template_container, "A name", ends_at)}
      before do
        allow(JWT).to receive(:decode).and_return [another_user.as_json]
      end

      it 'the request should be unsuccessful with a not found status' do
        expect(subject).to have_http_status :not_found
        expect(voting.reload.active?).to eq(true)
        expect(voting.ends_at).to eq(ends_at)
      end
    end
  end



end
