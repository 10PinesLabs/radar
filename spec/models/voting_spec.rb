require 'rails_helper'

RSpec.describe Voting, type: :model do
  include ActiveSupport::Testing::TimeHelpers

  let(:radar_template_container) { create :radar_template_container }
  let(:ends_at) { DateTime.now + 5.days }
  let(:name) { "A voting name" }
  let(:now) { DateTime.now }

  def freeze_time
    travel_to(Time.now)
  end

  before(:each) do
    freeze_time
  end

  describe "#generate_and_save_code" do

    let(:voting) { Voting.create!(radar_template_container: radar_template_container, ends_at: ends_at)}

    subject do
      voting.generate_and_save_code!
    end

    let(:generated_code) { '1234' }

    context 'when the generated code is free' do

      before do
        allow(SecureRandom).to receive(:alphanumeric).with(Voting::CODE_LENGTH)
                                   .and_return(generated_code)
      end

      it "updates the voting code" do
        expect{subject}.to change{voting.code}.from(nil).to(generated_code)
      end

    end

    context "when the generated code is already taken" do

      let(:newly_generated_code) { '4321' }

      before do
        Voting.create!(radar_template_container: radar_template_container, ends_at: ends_at, code: generated_code)
        allow(SecureRandom).to receive(:alphanumeric).with(Voting::CODE_LENGTH)
                                   .and_return(generated_code, newly_generated_code)
      end

      it "generates a new one until it gets one that's free" do
        expect{subject}.to change{voting.code}.from(nil).to(newly_generated_code)

      end
    end


  end

  describe ".generate!" do

    subject do
      Voting.generate!(radar_template_container, name, ends_at)
    end

    context "when there is already an active voting associated with the radar container" do

      before do
        Voting.create!(radar_template_container: radar_template_container, ends_at: DateTime.now + 2.days)
      end

      it "throws an error" do
        expect{subject}.to raise_error RuntimeError, RadarTemplateContainer::CANNOT_HAVE_MORE_THAN_ONE_ACTIVE_VOTING_ERROR_MESSAGE
      end

      it "does not create a new voting" do
        previous_voting_count = Voting.count
        subject
        fail('The test should have failed')

      rescue RuntimeError
        expect(Voting.count).to eq(previous_voting_count)
      end

    end

    context 'when there are no active votings associated with the radar container' do
      let(:a_radar_template) {create :radar_template}
      let(:another_radar_template) {create :radar_template}

      before do
        a_radar_template.update!(radar_template_container: radar_template_container)
        another_radar_template.update!(radar_template_container: radar_template_container)
      end

      it "creates a newly voting instance" do
        expect{subject}.to change{Voting.count}.from(0).to(1)
      end

      it 'creates a radar for every radar template in the radar template container' do
        expect{subject}.to change{Radar.count}.from(0).to(2)
        expect(a_radar_template.radars.count).to eq(1)
        expect(another_radar_template.radars.count).to eq(1)
      end

      it 'associates the new radars to the created voting' do
        subject
        expect(Voting.first.radars.count).to eq(2)
      end

      context "when the name is not passed" do
        let(:name) {nil}

        let(:expected_name) { "Votación de #{a_radar_template.name} del #{ends_at.to_date}" }
        let(:another_expected_name) { "Votación de #{another_radar_template.name} del #{ends_at.to_date}" }

        it "generates a automatic one indicating the container name and the date" do
          voting = subject
          expect(voting.reload.radars.all.map{|r| r.name}).to contain_exactly(expected_name, another_expected_name)
        end
      end

      context "when the name is passed" do
        let(:name) { "A voting name"}

        it "assigns the passed name to all generated radars" do
          voting = subject
          expect(voting.reload.radars.all.map{|r| r.name}).to contain_exactly(name, name)
        end
      end

    end

    context 'when the ends_at parameter is a past date' do
      let(:ends_at) {DateTime.now - 1.day}

      it "throws an error" do
        expect{subject}.to raise_error RuntimeError, Voting::CANNOT_CREATE_A_VOTING_FROM_A_PAST_DATE
      end

      it "does not create a new voting" do
        previous_voting_count = Voting.count
        subject
        fail('The test should have failed')

      rescue RuntimeError
        expect(Voting.count).to eq(previous_voting_count)
      end
    end

  end

  describe "#soft_delete!" do
    let(:voting) { Voting.create!(radar_template_container: radar_template_container, ends_at: ends_at)}
    let(:owner) { User.create!(name: "name", provider: "backoffice") }
    let(:passed_user) { owner }

    before do
      radar_template_container.update!(owner: owner)
    end

    subject do
      voting.soft_delete! passed_user
    end

    it "updates the 'deleted_at' field to the current date" do
      expect{subject}.to change{voting.deleted_at}.from(nil).to(now)
    end

    context "when the voting is already deleted" do

      before do
        voting.soft_delete! passed_user
        allow(DateTime).to receive(:now).and_return(now + 3.days)
      end

      it "does not do anything" do
        expect{subject}.to_not change{voting.deleted_at}
      end

    end

    context "when the user is not the owner of the associated container" do
      let(:passed_user) { User.create!(name: "Another name", provider: "backoffice")}

      it "returns the expect error" do
        expect{subject}.to raise_error(RuntimeError, Ownerable::DELETE_ACCESS_ERROR)
      end

      it "does not deletes the voting" do
        subject
        fail("The test should have failed")
      rescue Voting::VotingAccessError => e
        expect(voting.reload.deleted_at).to be_nil
      end
    end

  end

end
