FactoryGirl.define do
  factory :radar do
    axes { build_list(:axis, 3) }
  end
end
