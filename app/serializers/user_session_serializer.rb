class UserSessionSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :uid, :provider, :remaining_containers
end
