FactoryBot.define do
  factory :radar_template do
    axes { build_list(:axis, 3) }
    name { 'Retiro 2015' }
    description { 'Retiro 2015' }
    owner { association :user }
    radar_template_container { association :radar_template_container }

  end

  factory :different_radar_template, parent: :radar_template do
    name { 'Otro Retiro 2015' }
  end
end
