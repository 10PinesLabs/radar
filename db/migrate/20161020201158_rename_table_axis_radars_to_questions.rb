class RenameTableAxisRadarsToQuestions < ActiveRecord::Migration
  def change
    drop_table :questions
    rename_table :axes_radars, :questions
  end
end
