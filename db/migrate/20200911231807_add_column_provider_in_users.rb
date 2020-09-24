class AddColumnProviderInUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :provider, :string, {
        :null => false,
        :default => "backoffice"
    }
  end
end
