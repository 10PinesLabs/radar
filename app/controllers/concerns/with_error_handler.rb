module WithErrorHandler
  extend ActiveSupport::Concern

  def self.included(controller)
    controller.around_action :handle_domain_errors
  end

  def handle_domain_errors
    begin
      yield
    rescue ActionController::ParameterMissing => error
      render_error([error.message], :bad_request)
    rescue ActiveRecord::RecordInvalid => error
      errors = error.record.errors.flat_map { |_, error_list| error_list }
      render_error(errors, :bad_request)
    rescue ActiveRecord::RecordNotFound => error
      render_error([error.message], :not_found)
    rescue AlreadyClosedRadarException => error
      render_error([error.message], :unprocessable_entity)
    end
  end

  def render_error(error_messages, status)
    render json: {errors: error_messages}, status: status
  end
end