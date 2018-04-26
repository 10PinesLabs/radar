class ApplicationController < ActionController::Base
  include WithErrorHandler

  def angular
    render :'application/angular', layout: false
  end

  def check_admin_permission_to_see_page
    if admin_signed_in?
      angular
    else
      redirect_to '/', status: :unauthorized
    end
  end

  def check_not_admin_permission_to_see_page
    if admin_signed_in?
      redirect_to '/', status: :unauthorized
    else
      angular
    end
  end


  def check_admin_permission_to_run_block
    if admin_signed_in?
      yield
    else
      render json: { error: 'not admin' }, status: :unauthorized
    end
  end


  protected

  def after_sign_in_path_for(resource)
    '/radars'
  end

end
