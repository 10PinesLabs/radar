class RadarsController < ApplicationController

  def create
    radar = Radar.create!
    render json: radar, status: :ok
  end

end
