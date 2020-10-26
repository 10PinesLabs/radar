require 'rails_helper'

RSpec.describe VotingsController, type: :controller do
  include ActiveSupport::Testing::TimeHelpers
  let(:logged_user){create :user}
  let(:name){ 'Un nuevo voting'}
  let(:ends_at) { (DateTime.now + 1.day).utc}
  let(:radar_template) { create(:radar_template, owner: logged_user)}
  let(:a_radar_template_container) {radar_template.radar_template_container}

  def freeze_time
    travel_to(Time.now)
  end

  before(:each) do
    freeze_time
  end

  context 'when making a request to create a new voting is successful' do

    before do
      allow(controller).to receive(:ensure_authenticated!) { true }
    end

    subject do
      post :create, params: {
          radar_template_container_id: a_radar_template_container.id,
          name: name,
          ends_at: ends_at,
      }
    end

    it 'the request should succeed with created status' do
      expect(subject).to have_http_status :created
    end

    it 'the voting creation response body should have a radar template container id, an ends at date and a code' do
      subject

      expect(JSON.parse(response.body)['radar_template_container']['id']).to eq(a_radar_template_container.id)
      expect(JSON.parse(response.body)['ends_at']).to eq(ends_at)
      expect(JSON.parse(response.body)['code']).to_not be nil
    end

  end

  context 'when the radar template container id passed as param is invalid' do

    before do
      allow(controller).to receive(:ensure_authenticated!) { true }
    end

    subject do
      post :create, params: {
          radar_template_container_id: -1,
          name: name,
          ends_at: ends_at,
      }
    end

    it 'the request should fail with not found status' do
      expect(subject).to have_http_status :not_found
    end

  end

  context 'when the user is not authenticated' do
    subject do
      post :create, params: {
          radar_template_container_id: a_radar_template_container.id,
          name: name,
          ends_at: ends_at,
      }
    end

    it 'should return unauthorized status' do
      expect(subject).to have_http_status :unauthorized
    end
  end

end
