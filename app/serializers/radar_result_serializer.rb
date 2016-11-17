class RadarResultSerializer < ActiveModel::Serializer
  has_one :radar
  attributes :axes_results

  def radar
    object
  end

  def axes_results
    object.axes.map { |axis| AxisResultSerializer.new(axis) }
  end
end
