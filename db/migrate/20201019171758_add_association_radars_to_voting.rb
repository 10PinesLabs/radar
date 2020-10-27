class AddAssociationRadarsToVoting < ActiveRecord::Migration[5.0]
  def change
    add_belongs_to :radars, :voting
  end
end
