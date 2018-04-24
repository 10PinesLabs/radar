class ApplicationController < ActionController::Base
  include WithErrorHandler

  def angular
    render :'application/angular', layout: false
  end


  protected

  def after_sign_in_path_for(resource)
    '/createRadar'
  end

end
