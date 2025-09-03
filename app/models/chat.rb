# == Schema Information
#
# Table name: chats
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  model_id   :string
#
class Chat < ApplicationRecord
  acts_as_chat
end
