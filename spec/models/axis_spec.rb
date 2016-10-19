require 'rails_helper'

RSpec.describe Axis, type: :model do
  context 'When creating an Axis the description cannot be empty' do
    it 'the description cannot be empty' do
      expect{ Axis.create! }.to raise_error do |error|
        expect(error).to be_a(ActiveRecord::RecordInvalid)
        expect(error.record.errors[:description]).to be_include Axis::ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION
      end
    end
  end
end
