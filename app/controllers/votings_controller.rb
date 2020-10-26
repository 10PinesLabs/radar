class VotingsController < ApplicationController

  before_action :ensure_authenticated!, except: [:show_by_code]

  CONTAINER_NOT_FOUND_ERROR = 'No se encontró el radar template container'

  def create
    radar_template_container_id = params.require(:radar_template_container_id)
    name = params.permit(:name)['name']
    ends_at = DateTime.parse(params.require(:ends_at))

    if !RadarTemplateContainer.exists?(radar_template_container_id)
      render_error([CONTAINER_NOT_FOUND_ERROR], :not_found)
    else
      radar_template_container = RadarTemplateContainer.find(radar_template_container_id)
      voting = Voting.generate!(radar_template_container, name, ends_at)
      render json: voting, status: :created
    end
  end

  def show_by_code
    voting = Voting.find_by_code!(params.require(:code))
    render json: voting, status: :ok

    rescue ActiveRecord::RecordNotFound => error
      render_error([error.message], :not_found)
  end

end
