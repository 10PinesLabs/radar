class AddContainerLimitationToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, "max_containers", :bigint, {
      null: true
    }
  end
end
