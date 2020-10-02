class CreateUsersRadarTemplatesJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :radar_templates do |table|
      table.index :user_id
      table.index :radar_template_id
    end
  end
end
