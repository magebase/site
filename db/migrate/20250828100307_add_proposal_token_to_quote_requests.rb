class AddProposalTokenToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_column :quote_requests, :proposal_token, :string
    add_index :quote_requests, :proposal_token, unique: true
  end
end
