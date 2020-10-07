class CreateUserRadarTemplatesContainerJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :radar_template_containers do |table|
      table.index :user_id
    end
  end
end
