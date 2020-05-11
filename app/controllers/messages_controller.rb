class MessagesController < ApplicationController

  def new
    @message = Message.new
  end

  def create 
    @message = Message.create(msg_params)
    if @message.save
      ActionCable.server.broadcast 'message_channel',
                                    content: @message.title,
                                    content: @message.content
    end
  end

  private

  def msg_params
    params.require(:message).permit(:title, :content)
  end

end
