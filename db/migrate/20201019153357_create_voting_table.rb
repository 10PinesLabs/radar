class CreateVotingTable < ActiveRecord::Migration[5.0]
  def change
    create_table :votings do |t|
      t.belongs_to :radar_template_container
      t.timestamps null: false
      t.timestamp :ends_at
      t.string :code
    end
  end
end
