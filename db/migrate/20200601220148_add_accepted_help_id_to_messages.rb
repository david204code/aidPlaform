class AddAcceptedHelpIdToMessages < ActiveRecord::Migration[6.0]
  def change
    add_reference :messages, :accepted_help, foreign_key: true
  end
end
