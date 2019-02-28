FactoryBot.define do
  factory :axis do
    sequence(:name) { |n| "Axis #{n}" }
    description 'Descripcion de arista'
  end
end
