class OwnerableController < ApplicationController

  def if_ownerable_present(ownerable_id)
    ownerable = find_ownerable(ownerable_id)
    ownerable.is_known_by?(@logged_user) ? yield(ownerable) : render_not_found
  end

  def render_not_found
    render json: { errors: not_found_message}, :status => :not_found
  end

  def find_ownerable ownerable_id
    raise 'find_ownerable not def'
  end

  def not_found_message
    raise 'not_found_message_not_def'
  end


end
