class VotesController < ApplicationController
  def create
    answers = create_answers(params.require(:answers))
    vote = Vote.create!(answers: answers)
    render json: vote, status: :ok
  end

  private
  def create_answers(answer_params)
    answer_params.map do |answer|
      axis_id = answer.require(:axis).require(:id)
      points = answer.require(:points)
      Answer.new(axis_id: axis_id, points: points)
    end
  end
end
