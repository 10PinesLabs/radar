
class SessionController < ApplicationController

  before_action :ensure_authenticated

  def user
    render status: :ok, json: @logged_user.as_json
  end

end
