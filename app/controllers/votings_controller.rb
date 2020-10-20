class VotingsController < ApplicationController

  before_action :ensure_authenticated!, except: [:show]

  def create
    radar_template_container = RadarTemplateContainer.find(params.require(:radar_template_container_id))
    ends_at = DateTime.parse(params.require(:ends_at))
    voting = Voting.generate!(radar_template_container, ends_at)
    render json: {code: voting.code}, status: :created
  end

  def show_by_code
    voting = Voting.find_by_code(code: params.require(:code))
    render json: voting, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render_error([error.message], :not_found)
  end

end
