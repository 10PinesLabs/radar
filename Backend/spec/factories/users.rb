FactoryBot.define do
  factory :user do
    name {'pino'}
    uid  { '54321' }
    email {'pino@pino.com'}
    provider { 'google_oauth2' }
  end



end
