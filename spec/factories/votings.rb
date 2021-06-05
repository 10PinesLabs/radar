FactoryBot.define do
    factory :voting do
        radar_template_container {association :radar_template_container}
        ends_at {DateTime.now}
    end

    factory :deleted_voting, parent: :voting do
        deleted_at {DateTime.now}
    end

  end
  