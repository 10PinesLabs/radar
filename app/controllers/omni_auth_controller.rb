class OmniAuthController < ApplicationController
  def callback
    unless is_root_user?
      redirect_to "#{base_url}/error?message=#{only_roots_available_message}"
      return
    end

    create_admin

    redirect_to "#{base_url}/token/#{generate_token}"
  end


  def failure
    message = if request.env['omniauth.error.type'] == :cancel
                'Se ha denegado el acceso'
              else
                'No hemos podido autenticarte'
              end

    redirect_to "#{base_url}/error?message=#{message}"
  end

  def redirect
    backend_url = request.env['REQUEST_URI']
    backend_url.slice! '/auth/backoffice/redirect'
    redirect_to "#{ENV.fetch('BACKOFFICE_URL')}/auth/sign_in?redirect_url=#{backend_url}/auth/backoffice/callback&app_id=ruben_radar"
  end

  private

  def create_admin
    admin = Admin.find_by_backoffice_id(auth_hash[:uid])
    unless admin
      Rails.logger.info("Admin de backoffice con id #{auth_hash[:uid]} no existe, creando nuevo")
      admin = Admin.create!(
        nombre_de_admin: auth_hash[:info][:nickname],
        email: auth_hash[:info][:email],
        backoffice_id: auth_hash[:uid]
      )
    end
    Rails.logger.info("Admin #{admin.id} loggeado desde backoffice")
  end

  def generate_token
    hmac_secret = ENV.fetch('BACKOFFICE_SECRET')
    payload = auth_hash[:info]

    JWT.encode payload, hmac_secret, 'HS256'
  end

  def is_root_user?
    auth_hash[:extra][:root]
  end

  def auth_hash
    request.env['omniauth.auth']
  end

  def base_url
    ENV.fetch('DOMAIN_BASE_URL')
  end

  def only_roots_available_message
    'Esta funcionalidad es solo para roots'
  end
end
