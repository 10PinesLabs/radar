class RadarTemplateContainersController < ApplicationController

  before_action :ensure_authenticated!

  def index
    render json: @logged_user.accessible_radar_template_containers, logged_user: @logged_user , status: :ok
  end

  def show
    radar_template_container_id = params.require(:id)
    if_container_present radar_template_container_id do |container|
      render json: container, logged_user: @logged_user, status: :ok
    end
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
    shared_users = params.require(:users_ids)
    radar_template_container_id = params.require(:id)

    if_container_present radar_template_container_id do |container|
      shared_users.each do |user|
        shared_user = User.find(user)
        container.add_user(@logged_user, shared_user)
      end
      render status: :ok, json: {message: "El container se compartio satisfactoriamente"}
    end
  end

  def clone
    radar_template_container_id = params.require(:id)
    name = params.require(:name)
    rest = params.permit(:description, :share)

    if_container_present radar_template_container_id do |container|
      cloned_container = container.clone_container!(@logged_user, name, rest["description"], share: rest["share"])
      render json: cloned_container, logged_user: @logged_user, status: :created
    end
  end

  def is_pinned
    if_container_present params.require(:id) do |container|
      render json: container.pinned, status: :ok
    end
  end

  def pin
    pin = params.require(:pin)
    if_container_present params.require(:id) do |container|
      container.update!(pinned: pin)
    end
    head :no_content
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
