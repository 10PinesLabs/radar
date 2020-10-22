require 'rails_helper'

RSpec.describe Voting, type: :model do

  let(:radar_template_container) { create :radar_template_container }
  let(:ends_at) { DateTime.now + 5.days }

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

  describe "#generate!" do

    subject do
      Voting.generate!(radar_template_container, ends_at)
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

end
