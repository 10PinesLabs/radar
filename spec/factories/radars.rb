FactoryBot.define do
  factory :radar do
    axes { build_list(:axis, 3) }
    name 'Retiro 2015'
    description 'Retiro 2015'
  end
end
