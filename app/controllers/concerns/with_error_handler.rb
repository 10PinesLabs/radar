module WithErrorHandler
  extend ActiveSupport::Concern

  def handle_domain_errors
    begin
      yield
    rescue ActionController::ParameterMissing, ActiveRecord::RecordInvalid => error
      render_error(error.message, :bad_request)
    rescue ActiveRecord::RecordNotFound => error
      render_error(error.message, :not_found)
    rescue AlreadyClosedRadarException => error
      render_error(error.message, :unprocessable_entity)
    end
  end

  def render_error(error_message, status)
    render json: {error: error_message}, status: status
  end
end