class ApplicationController < ActionController::Base
  include WithErrorHandler

  def angular
    render :'application/angular', layout: false
  end

  def check_admin_permission
    if admin_signed_in?
      angular
    else
      redirect_to('/')
    end
  end

  protected

  def after_sign_in_path_for(resource)
    '/radars'
  end

end
