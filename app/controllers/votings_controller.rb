class VotingsController < ApplicationController

  before_action :ensure_authenticated!, except: [:show_by_code]

  CONTAINER_NOT_FOUND_ERROR = 'No se encontró el radar template container'

  def create
    radar_template_container = RadarTemplateContainer.find(params.require(:radar_template_container_id))
    if radar_template_container && radar_template_container.is_known_by?(@logged_user)
      name = params.permit(:name)['name']
      ends_at = DateTime.parse(params.require(:ends_at))

      voting = Voting.generate!(radar_template_container, name, ends_at)
      render json: voting, logged_user: @logged_user, status: :created
    else
      render_error([CONTAINER_NOT_FOUND_ERROR], :not_found)
    end
  end

  def show_by_code
    voting = Voting.find_by_code!(params.require(:code))
    render json: voting, logged_user: @logged_user, status: :ok

    rescue ActiveRecord::RecordNotFound => error
      render_error([error.message], :not_found)
  end

end
