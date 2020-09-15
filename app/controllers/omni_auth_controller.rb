class OmniAuthController < ApplicationController
  def callback
    if params[:provider] == 'backoffice' && !is_root_user?
      redirect_to "#{base_url}/error?message=#{only_roots_available_message}"
      return
    end

    login_user params[:provider]

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
    case params[:provider]
    when 'backoffice'
      backend_url = ENV['BASE_URL']
      redirect_to "#{ENV.fetch('BACKOFFICE_URL')}/auth/sign_in?redirect_url=#{backend_url}/auth/backoffice/callback&app_id=radar-app"
    when 'google'
      redirect_to "/auth/google_oauth2"
    else
      render json: { errors: 'Proveedor de autenticacion invalido' }, status: :not_found
    end
  end

  private

  def login_user provider
    user = User.find_or_create_by!(uid: auth_hash[:uid]) do |user|
      user.name = auth_hash[:info][:name]
      user.email = auth_hash[:info][:email]
      user.provider = provider
    end

    Rails.logger.info("Admin #{user.id} loggeado desde #{provider}")
  end

  def generate_token
    hmac_secret = Rails.configuration.jwt_secret
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
