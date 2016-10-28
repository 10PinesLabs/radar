class RadarResultSerializer < ActiveModel::Serializer
  attributes :radar_id, :axes_results

  def radar_id
    object.id
  end

  def axes_results
    object.axes.map { |axis| AxisResultSerializer.new(axis) }
  end
end
