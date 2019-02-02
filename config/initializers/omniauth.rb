Rails.application.config.middleware.use OmniAuth::Builder do
  provider :backoffice,
           app_id: 'ruben_radar',
           secret: ENV.fetch('BACKOFFICE_SECRET', 'ASDFSGDFrgfdfgsdfgdfg'),
           backoffice_url: 'https://backoffice.com',
           callback_path: '/auth/backoffice/callback'
end
