class AcceptedHelpsController < ApplicationController
  before_action :get_help
  before_action :set_accepted, only: [:show, :edit, :update, :destroy]

  def new
    @accepted_help = AcceptedHelp.new(user:current_user)
  end

  def create
    @accepted_help = AcceptedHelp.new(accepted_params.merge(user_id: session[:user_id]))

    unless @accepted_help.save
      render json: @accepted_help.errors, status: :unprocessable_entity
    end

    respond_to do |format|
      if @accepted_help.save
        format.html { redirect_to @accepted_help, notice: 'Accpeted was successfully created.' }
      else
        format.html { render :new }
        format.json { render json: @accepted_help.errors, status: :unprocessable_entity }
      end
    end
  end

  def index
    @accepted_helps = @help.accepted_helps
    # @help = Help.all
    render json: { data: @accepted_helps }
  end

  def show
    @accepted_helps ||= @help.accepted_helps.find(params[:id])
    render json: @accepted_helps.help
    # render json: @accepted_helps.help.user.email
  end

  def getId
    @accepted_help ||= @help.accepted_helps.find(params[:id])
    render json: @accepted_help
  end

  def getUser
    @accepted_help ||= @help.accepted_helps.find(params[:id])
    render json: @accepted_help.help.user
  end

  def getLast
    # @accepted_help = AcceptedHelp.last
    @accepted_help ||= @help.accepted_helps.last
    render json: @accepted_help
  end

  private 

  def get_help
    @help = Help.find(params[:help_id])
  end

  def set_accepted
    @accepted_help = @help.accepted_helps.find(params[:id])
  end

  def accepted_params
    params.fetch(:accepted_help, {}).permit(
      :help_id
    )
  end

end