class VotingSerializer < ActiveModel::Serializer
  attributes :id, :code, :ends_at
  belongs_to :radar_template_container
end
