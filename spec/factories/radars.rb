FactoryGirl.define do
  factory :radar do
    active true

    after(:build) do |radar, evaluator|
      radar.axes.push build_list(:axis, 3)
    end
  end
end
