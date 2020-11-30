require 'rails_helper'

RSpec.describe SessionController, type: :controller do

  context 'When requesting for user' do

    subject do
      get :user
    end

    it 'should return not found' do
      expect(subject).to have_http_status :not_found
    end

    context 'and the user is logged in' do
      let(:logged_user){create :user}

      before do
        allow(JWT).to receive(:decode).and_return [logged_user.as_json]
      end

      it 'should return ok' do
        expect(subject).to have_http_status :ok
      end

      it 'should return the user in the body' do
        subject
        deserialized_response = JSON.parse(response.body)

        expect(deserialized_response['id']).to eq logged_user['id']
        expect(deserialized_response['uid']).to eq logged_user['uid']
        expect(deserialized_response['name']).to eq logged_user['name']
        expect(deserialized_response['email']).to eq logged_user['email']
        expect(deserialized_response['provider']).to eq logged_user['provider']
      end
    end
  end
end
