require 'rails_helper'

RSpec.describe SessionController, type: :controller do

  context 'When requesting for user' do

    subject do
      get :user
    end

    it 'should return unauthorizd' do
      expect(subject).to have_http_status :unauthorized
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
        expect(eval(subject.body)[:id]).to eq logged_user['id']
        expect(eval(subject.body)[:uid]).to eq logged_user['uid']
        expect(eval(subject.body)[:name]).to eq logged_user['name']
        expect(eval(subject.body)[:email]).to eq logged_user['email']
        expect(eval(subject.body)[:provider]).to eq logged_user['provider']
      end
    end
  end
end
