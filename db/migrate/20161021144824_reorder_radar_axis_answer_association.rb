class ReorderRadarAxisAnswerAssociation < ActiveRecord::Migration
  def change
    remove_column :answers, :question_id
    add_belongs_to :answers, :axis
    add_belongs_to :axes, :radar
  end
end
