class Help < ApplicationRecord
  belongs_to :user
  # attr_accessor  :color

  # def initialize
  #   :color == color
  # end

  # def color
  #   if (@request_type == 'one-time')
  #     return 'blue'
  #   else 
  #     return 'green'
  #   end
  # end

end
