FactoryBot.define do
  factory :admin do
    email 'user@name.com'
    password 'password'
    password_confirmation 'password'
    confirmed_at Date.today
  end
end
