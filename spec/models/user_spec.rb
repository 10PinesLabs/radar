require 'rails_helper'

RSpec.describe User, type: :model do

  let(:user) { create :user}

  context '#remaining_containers' do
    let(:user) { create :user, max_containers: max_containers}
    let!(:owned_radar_template_container) {create :radar_template_container, owner: user}
    let!(:accessible_radar_template_container) {create :radar_template_container, :users => [user]}

    subject do
      user.remaining_containers
    end

    context "if the user does not have the max_containers setting set" do
      let(:max_containers) {nil}

      it "returns nil" do
        expect(subject).to be nil
      end
    end

    context "if the user does have the max_containers setting set" do
      let(:max_containers) {5}

      it "returns the difference between that setting and the amount of owned containers, without subtracting shared ones" do
        expect(subject).to eq(max_containers - user.owned_radar_template_containers.count)
      end
    end
  end

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
