class UsersController < ApplicationController
  before_action :ensure_authenticated!

  def users
    users = User.all
    render json: users, status: :ok
  end
end