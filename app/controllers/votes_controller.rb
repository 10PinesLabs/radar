class VotesController < ApplicationController
  def create
    answers = create_answers(params.require(:answers))
    vote = Vote.create!(answers: answers)
    render json: vote, status: :ok
  end

  private
  def create_answers(answer_params)
    answer_params.map { |answer| Answer.new(answer.permit(:axis_id, :points)) }
  end
end
