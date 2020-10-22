require 'rails_helper'

RSpec.describe Voting, type: :model do

  let(:radar_template_container) { create :radar_template_container }
  let(:ends_at) { DateTime.now + 5.days }

  let(:voting) { Voting.create!(radar_template_container: radar_template_container, ends_at: ends_at)}

  describe "#generate_and_save_code" do

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

end
