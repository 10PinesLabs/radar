class AddAxisRadarAssociation < ActiveRecord::Migration
  def change
    create_table :axes_radars do | t |
      t.belongs_to :axis
      t.belongs_to :radar
    end
  end
end
