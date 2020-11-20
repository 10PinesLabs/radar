require 'rails_helper'

RSpec.describe User, type: :model do

  let(:user) { create :user}

  context '#can_create_new_container?' do

    it 'should return true' do
      expect(user.can_create_new_container?).to eq true
    end

    context 'when the user has reached the max amount of containers' do
      before do
        user.update!(max_containers: 0)
      end

      it 'should return false' do
        expect(user.can_create_new_container?).to eq false
      end


    end

  end
end