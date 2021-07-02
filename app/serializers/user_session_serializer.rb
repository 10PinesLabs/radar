class UserSessionSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :uid, :provider
end
