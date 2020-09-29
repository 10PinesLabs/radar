class RadarTemplatesController < ApplicationController

  before_action :ensure_authenticated!

  def create
    axes = params.require(:axes).map { |axis| create_axis(axis) }
    name = params.require(:name)
    description = params.require(:description)
    radar_template = RadarTemplate.create!(axes: axes, name: name, description: description, owner_id: @logged_user['id'])
    render json: radar_template, status: :created
  end

  def show
    radar_template = RadarTemplate.find(params.require(:id))
    unless radar_template.owner_id == @logged_user['id']
      render json: { errors: radar_not_found_message}, :status => :not_found
      return
    end
    render json: radar_template, status: :ok
  end

  def index
    render json: RadarTemplate.where(:user_id => @logged_user['id']), status: :ok
  end

  private

  def create_axis(axis)
    Axis.new(name: axis.require(:name), description: axis['description'])
  end

  def radar_not_found_message
    "No se encontro el radar template"
  end

end
