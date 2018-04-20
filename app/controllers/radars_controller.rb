class RadarsController < ApplicationController
  before_action :authenticate_admin!, only: [:create, :close]

  def create
    axes = params.require(:axes).map { |axis| create_axis(axis) }
    description = params.require(:description)
    radar = Radar.create!(axes: axes, description: description)
    render json: radar, status: :created
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
    radar = Radar.find(params.require(:id))
    radar.close
    radar.save
    render json: radar, status: :ok
  end

  def index
    render json: Radar.all, status: :ok
  end

  def isloggedin
    render json: {is_logged_in: admin_signed_in?}, status: :ok
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
