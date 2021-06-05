FactoryBot.define do
  factory :radar do
    radar_template { association :radar_template }
    name { 'Retiro 2015' }
    description { 'Retiro 2015' }
    voting {association :voting}
  end

  factory :different_radar, parent: :radar do
    name { 'Otro Retiro 2015' }
  end

  factory :deleted_radar, parent: :radar do
    name {"Borrado"}
    voting {association :deleted_voting}
  end
end
