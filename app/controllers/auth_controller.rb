class AuthController < ApplicationController

  respond_to :json

  def create
    resource = Admin.find_for_database_authentication(email: params[:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:password])
      sign_in('user', resource)
      render json: { success: true, auth_token: resource.authentication_token, login: resource.login, email: resource.email }
      return
    end
    invalid_login_attempt
  end

  protected

  def invalid_login_attempt
    warden.custom_failure!
    render json: { success: false, message: 'Error with your login or password' }, status: 401
  end

end
