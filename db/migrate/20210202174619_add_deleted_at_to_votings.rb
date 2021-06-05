class AddDeletedAtToVotings < ActiveRecord::Migration[5.0]
  def change
    add_column :votings, "deleted_at", :datetime
  end
end
