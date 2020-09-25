class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include WithErrorHandler

  def ensure_authenticated!
    header = request
               .headers['Authorization']
               &.split(' ')
               &.last

    begin
      @logged_user = JWT.decode(header, Rails.configuration.jwt_secret)[0]
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end


end
