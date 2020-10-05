class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :points
      t.belongs_to :vote
      t.timestamps null: false
    end
  end
end
