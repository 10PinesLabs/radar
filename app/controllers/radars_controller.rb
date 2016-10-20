class RadarsController < ApplicationController

  def create
    axes = params.require(:axes).map { |axis| find_or_create_axis(axis) }
    radar = Radar.create!(axes: axes)
    render json: radar, status: :ok
  end

  private
  def find_or_create_axis(axis)
    axis[:id] ? Axis.find(axis[:id]) : Axis.create!(description: axis.require(:description))
  end
end
