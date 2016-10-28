require 'rails_helper'

RSpec.describe Axis, type: :model do
  context 'When creating an Axis without description' do
    it 'raises an error' do
      expect { Axis.create! }.to raise_error do |error|
        expect(error).to be_a(ActiveRecord::RecordInvalid)
        expect(error.record.errors[:description]).to be_include Axis::ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION
      end
    end
  end
  context 'when creating an axis without a radar' do
    it 'raises an error' do
      expect { Axis.create! }.to raise_error do |error|
        expect(error).to be_a(ActiveRecord::RecordInvalid)
        expect(error.record.errors[:radar]).to be_include "can't be blank"
      end
    end
  end
end
