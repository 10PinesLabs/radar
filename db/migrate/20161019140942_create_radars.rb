class CreateRadars < ActiveRecord::Migration
  def change
    create_table :radars do |t|

      t.timestamps null: false
    end
  end
end
