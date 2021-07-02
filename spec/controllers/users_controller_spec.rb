require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:logged_user){create :user}
  let!(:another_user){create :user, email: 'anotheruser@gmail.com', uid: SecureRandom.uuid}
  let(:serialized_users)  {
    [
        {
            'id' => another_user.id,
            'name' => another_user.name,
            'email' => another_user.email,
            'remaining_containers' => nil
        },
        {
            'id' => logged_user.id,
            'name' => logged_user.name,
            'email' => logged_user.email,
            'remaining_containers' => nil
        }
    ]
  }

  context 'When logged in as a valid user' do
    before do
      allow(JWT).to receive(:decode).and_return [logged_user.as_json]
    end

    describe '#users' do
      let(:subject) { get :users}
      it 'returns all users' do
        subject
        expect(response).to have_http_status :ok
        expect(JSON.parse(response.body)).to eq(serialized_users)
      end
    end
  end
end
