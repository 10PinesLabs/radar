FactoryBot.define do
  factory :radar_template_container do
    sequence(:name) { |n| "Radar template container #{n}" }
    description { 'Radares anuales de 10Pines' }
    owner { association :user }
  end

  factory :different_radar_template_container, parent: :radar_template_container do
    name { 'Otro container' }
  end
end
