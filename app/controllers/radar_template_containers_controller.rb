class RadarTemplateContainersController < ApplicationController

  before_action :ensure_authenticated! , except: [:show_with_code]

  def index
    render json: @logged_user.accessible_radar_template_containers, logged_user: @logged_user , status: :ok
  end

  def show
    radar_template_container_id = params.require(:id)
    if_container_present radar_template_container_id do |container|
      render json: container, logged_user: @logged_user, status: :ok
    end
  end

  def show_with_code
    container = RadarTemplateContainer.find_by_show_code(params['#'])
    container ? render( json: container, logged_user: @logged_user, status: :ok) : render_not_found
  end

  def create
    name = params.require(:name)
    description = params.require(:description)
    radar_template_container = RadarTemplateContainer.create!(name: name, description: description, owner_id: @logged_user.id)
    render json: radar_template_container, logged_user: @logged_user, status: :created
  end

  def close
    radar_template_container = RadarTemplateContainer.find(params.require(:id))
    radar_template_container.close @logged_user
    render json: radar_template_container, logged_user: @logged_user, status: :ok
  end

  def share
    shared_user = User.find(params.require(:user_id))
    radar_template_container_id = params.require(:id)

    if_container_present radar_template_container_id do |container|
      begin
        container.add_user(@logged_user, shared_user)
        render status: :ok, json: "El constainer se compartio satisfactoriamente"
      rescue StandardError => error_message
        render status: :unauthorized, json: error_message
      end
    end
  end

  private

  #TODO: Delete duplicated code (see RadarTemplateController)
  def if_container_present(container_id)
    radar_template_container = RadarTemplateContainer.find(container_id)
    radar_template_container.is_known_by?(@logged_user) ? yield(radar_template_container) : render_not_found
  end

  def render_not_found
    render json: { errors: radar_not_found_message}, :status => :not_found
  end

  def radar_not_found_message
    "No se encontro el radar template"
  end
end
