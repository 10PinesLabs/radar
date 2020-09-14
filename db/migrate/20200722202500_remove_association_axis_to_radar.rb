class RemoveAssociationAxisToRadar < ActiveRecord::Migration[5.0]
  def change
    remove_belongs_to :axes, :radar
  end
end
