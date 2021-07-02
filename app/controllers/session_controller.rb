class SessionController < ApplicationController
  before_action :ensure_authenticated
  def user
    render json: @logged_user, serializer: UserSessionSerializer, status: :ok
  end
end
