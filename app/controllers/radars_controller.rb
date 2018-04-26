class RadarsController < ApplicationController
  # before_action :authenticate_admin!, only: [:create, :close, :index]

  def create
    check_admin_permission_to_run_block do
        axes = params.require(:axes).map { |axis| create_axis(axis) }
        name = params.require(:name)
        description = params.require(:description)

        radar = Radar.create!(axes: axes, name: name, description: description)
        render json: radar, status: :created
      end
  end

  def result
    radar = Radar.find(params.require(:id))
    render json: RadarResultSerializer.new(radar, {}).to_json , status: :ok
  end

  def show
    radar = Radar.find(params.require(:id))
    render json: radar, status: :ok
  end

  def close
    check_admin_permission_to_run_block do
      radar = Radar.find(params.require(:id))
      radar.close
      radar.save
      render json: radar, status: :ok
    end
  end

  def index
    check_admin_permission_to_run_block do
      render json: Radar.all, status: :ok
    end
  end

  def is_logged_in
    status = :ok
    status = :unauthorized if !admin_signed_in?

    render json: {is_logged_in: admin_signed_in?}, status: status
  end

  def is_not_logged_in
    status = :ok
    status = :unauthorized if admin_signed_in?

    render json: {is_logged_in: admin_signed_in?}, status: status
  end

  def signout
    sign_out current_admin
    render json: {is_logged_in: admin_signed_in?}, status: :ok
  end

  private

  def create_axis(axis)
    Axis.new(description: axis.require(:description))
  end

end
