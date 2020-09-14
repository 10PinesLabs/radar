class RadarTemplatesController < ApplicationController

  before_action :ensure_authenticated!

  def create
    axes = params.require(:axes).map { |axis| create_axis(axis) }
    name = params.require(:name)
    description = params.require(:description)

    radar_template = RadarTemplate.create!(axes: axes, name: name, description: description)
    render json: radar_template, status: :created
  end

  def show
    radar_template = RadarTemplate.find(params.require(:id))
    render json: radar_template, status: :ok
  end

  def index
    render json: RadarTemplate.all, status: :ok
  end

  private

  def create_axis(axis)
    Axis.new(name: axis.require(:name), description: axis['description'])
  end

end
