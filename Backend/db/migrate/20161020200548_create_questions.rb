class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.belongs_to :axis
      t.belongs_to :radar
      t.timestamps null: false
    end
  end
end
