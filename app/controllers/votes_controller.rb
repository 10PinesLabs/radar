class VotesController < ApplicationController
  def create
    answers = create_answers(params.require(:answers))
    vote = Vote.create!(answers: answers)
    render json: vote, status: :ok
  end

  private
  def create_answers(answer_params)
    #We should ensure somehow that all the questions answers are from the same radar
    answer_params.map { |answer| Answer.new(answer.permit(:axis_id, :points)) }
  end
end
