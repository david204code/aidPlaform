class AddDefaultValueToHelps < ActiveRecord::Migration[6.0]
  def change
    change_column :helps, :status, :string, default: "unfulfilled"
  end
end
