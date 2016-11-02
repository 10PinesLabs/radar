FactoryGirl.define do
  factory :radar do
    axes { build_list(:axis, 3) }
    description 'Retiro 2015'
  end
end
