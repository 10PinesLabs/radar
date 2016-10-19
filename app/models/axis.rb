class Axis < ActiveRecord::Base
  ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION = "The Axis' description cannot be empty"
  validates :description, presence: { message: ERROR_MESSAGE_FOR_EMPTY_DESCRIPTION }

end
