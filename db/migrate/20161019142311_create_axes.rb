class CreateAxes < ActiveRecord::Migration
  def change
    create_table :axes do |t|
      t.string :text

      t.timestamps null: false
    end
  end
end
