class RemoveDefaultInProviderFromUsers < ActiveRecord::Migration[5.0]
  def change
    change_column_default :users, :provider, nil
  end
end
