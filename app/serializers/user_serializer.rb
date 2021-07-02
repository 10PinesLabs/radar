class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :remaining_containers
end
