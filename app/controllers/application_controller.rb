class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include WithErrorHandler

  def angular
    render :'application/angular', layout: false
  end


  protected

  def after_sign_in_path_for(resource)
    '/createRadar'
  end

end
