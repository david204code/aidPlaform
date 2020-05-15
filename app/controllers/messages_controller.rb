class MessagesController < ApplicationController
  before_action :set_msg, only: [:show, :edit, :update, :destroy]

  def index
    @messages = Message.all
  end

  def show
  end

  def new
    @message = Message.new
    @messages = Message.all
  end

  def edit
  end

  def create
    @message = Message.new(msg_params)

    respond_to do |format|
      if @message.save
        ActionCable.server.broadcast 'message_channel', content: @message 
        format.html { redirect_to @message, notice: 'Message was successfully created.' }
        format.json { render :show, status: :created, location: @message } 
        format.js
      else
        format.html { render :new }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @message.update(msg_params)
        format.html { redirect_to @message, notice: 'Message was successfully updated.' }
        format.json { render :show, status: :ok, location: @message }
      else
        format.html { render :edit }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @message.destroy
    ActionCable.server.broadcast 'remove_channel', content: @message 

    respond_to do |format|
      format.html { redirect_to messages_url, notice: 'Message was successfully destroyed.' }
      format.json { head :no_content }
      format.js
    end
  end

  private 

  def set_msg
    @message = Message.find(params[:id])
  end

  def msg_params
    params.require(:message).permit(:title, :content)
  end

end
