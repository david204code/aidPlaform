class AcceptedHelpsController < ApplicationController

  def new
    @accepted_help = AcceptedHelp.new(user:current_user)
  end

  def create
    
  end

end