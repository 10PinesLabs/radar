FactoryGirl.define do
  factory :radar do
    active true

    transient do
      axes_count 5
    end

    after(:build) do |radar, evaluator|
      radar.axes.push build_list(:axis, evaluator.axes_count)
    end
  end
end
