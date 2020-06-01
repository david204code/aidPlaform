class AcceptedHelpsController < ApplicationController

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
    @accepted_help = AcceptedHelp.all
    render json: { data: @accepted_help }
  end

  def show
    @accepted_help ||= AcceptedHelp.find(params[:id])
    render json: @accepted_help
  end

  private 

  def accepted_params
    params.fetch(:accepted_help, {}).permit(
      :help_id
    )
  end

end