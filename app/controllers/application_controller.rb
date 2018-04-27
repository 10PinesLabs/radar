class ApplicationController < ActionController::Base
  include WithErrorHandler

  def angular
    render :'application/angular', layout: false
  end

  protected

  def after_sign_in_path_for(resource)
    '/radars'
  end

  def check_admin_permission
    if admin_signed_in?
      yield
    else
      render json: { error: 'not admin' }, status: :unauthorized
    end
  end

end
