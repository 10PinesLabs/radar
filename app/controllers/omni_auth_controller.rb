class OmniAuthController < ApplicationController
  def callback
    admin = Admin.find_by_backoffice_id(auth_hash[:uid])
    unless admin
      Rails.logger.info("Admin de backoffice con id #{auth_hash[:uid]} no existe, creando nuevo")
      admin = Admin.create!(nombre_de_admin: auth_hash[:info][:nickname], email: auth_hash[:info][:email], backoffice_id: auth_hash[:uid], password: Admin::DEFAULT_PASSWORD)
    end
    Rails.logger.info("Admin #{admin.id} loggeado desde backoffice")
    sign_in_admin(admin)
  end

  def failure
    message = if request.env['omniauth.error.type'] == :cancel
                "Se ha denegado el acceso"
              else
                "No hemos podido autenticarte"
              end

    redirect_to new_admin_session_path, alert: message
  end

  private

  def sign_in_admin(admin)
    sign_in(:admin, admin, force: true)
    redirect_to root_path
  end

  def auth_hash
    request.env['omniauth.auth']
  end
end
