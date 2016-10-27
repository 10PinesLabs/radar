FactoryGirl.define do
  factory :axis do
    sequence(:description) { |n| "Axis #{}" }
  end
end
