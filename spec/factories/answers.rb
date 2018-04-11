FactoryBot.define do
  factory :answer do
    points 3
    association :axis, factory: :axis
  end
end
