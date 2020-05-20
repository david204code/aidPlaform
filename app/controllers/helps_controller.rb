class HelpsController < ApplicationController

  def new 
    @help = Help.new(user:current_user)
  end

  def create
    # @help = Help.create!(help_params)
    # @help.user_id = session[:user_id]
    
    @help = Help.new(help_params.merge(user_id: session[:user_id]))
    
    if @help.request_type == 'material-need'
      @help.color = "red"
    else
      @help.color = "blue"
    end

    # @help = Help.new(title: params[:title],
    #                 description: params[:description],
    #                 request_type: params[:request_type],
    #                 location_long: params[:location_long],
    #                 location_lat: params[:location_lat],
    #                 status: params[:status],
    #                 user_id: session[:user_id])

    unless @help.save
      render json: @help.errors, status: :unprocessable_entity
    end

    respond_to do |format|
      if @help.save
        format.html { redirect_to @help, notice: 'Help was successfully created.' }
        # format.json { render :show, status: :created, location: @help }
      else
        format.html { render :new }
        format.json { render json: @help.errors, status: :unprocessable_entity }
      end
    end
  end

  def index
    @help = Help.all
    # @help = Help.first
    # help 
    render json: { data: @help }
  end

  def show 
    @help ||= Help.find(params[:id])
    # render json: { data: @help }
    render json: @help
  end

  private

  def help_params
    params.fetch(:help, {}).permit(
      :title,
      :description,
      :request_type,
      :location_long,
      :location_lat,
      :status
    )
  end

end
