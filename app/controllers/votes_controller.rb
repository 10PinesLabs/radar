class VotesController < ApplicationController
  before_action :ensure_authenticated!, except: [ :create ]

  def create
    template = RadarTemplate.find(params.require(:radar_template_id))
    radar = template.radars.where(:active == true).last!
    answers = create_answers(radar, params.require(:answers))
    vote = Vote.create!(answers: answers)
    render json: vote, status: :ok
  end

  private
  def create_answers(radar, answer_params)
    answer_params.map do |answer|
      axis_id = answer.require(:axis).require(:id)
      points = answer.require(:points)
      Answer.new(axis_id: axis_id, points: points, radar: radar)
    end
  end
end
