class MakeUserIdNotNullInTableRadarTemplate < ActiveRecord::Migration[5.0]
  def change
    change_column_null :radar_templates, :users_id, false
  end
end
