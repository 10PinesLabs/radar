class RadarsController < ApplicationController

  before_action :ensure_authenticated!, except: [:result, :show]

  def create
    name = params.require(:name)
    description = params.require(:description)
    radar_template_id = params.require(:radar_template_id)

    radar = Radar.create!(radar_template_id: radar_template_id, name: name, description: description)
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

  private

  def create_axis(axis)
    Axis.new(name: axis.require(:name), description: axis['description'])
  end
end
