Rails.application.config.middleware.use OmniAuth::Builder do
  provider :backoffice,
           app_id: 'ruben_radar',
           secret: ENV.fetch('BACKOFFICE_SECRET'),
           backoffice_url: ENV.fetch('BACKOFFICE_URL'),
           callback_path: '/auth/backoffice/callback'
end
