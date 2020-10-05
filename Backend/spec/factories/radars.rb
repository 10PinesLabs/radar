FactoryBot.define do
  factory :radar do
    radar_template { association :radar_template }
    name { 'Retiro 2015' }
    description { 'Retiro 2015' }
  end

  factory :different_radar, parent: :radar do
    name { 'Otro Retiro 2015' }
  end
end
