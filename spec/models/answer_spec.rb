require 'rails_helper'

RSpec.describe Answer, type: :model do
  context 'When creating an answer' do
    context 'with no axis' do
      it 'should raise an error' do
        expect{Answer.create!}.to raise_error do |error|
          expect(error).to be_a(ActiveRecord::RecordInvalid)
          expect(error.record.errors[:axis]).to be_include Answer::ERROR_MESSAGE_FOR_NO_AXIS
        end
      end
    end
  end
end
