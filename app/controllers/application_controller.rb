class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include WithErrorHandler

  def ensure_authenticated!
    begin
      login
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

  def ensure_authenticated
      login rescue render status: :not_found, json: "No esta logueado"
  end

  private

  def login
    header = request
                 .headers['Authorization']
                 &.split(' ')
                 &.last
    logged_user_hash = JWT.decode(header, Rails.configuration.jwt_secret)[0]
    @logged_user = User.find_by_id(logged_user_hash['id'])

  end


end
