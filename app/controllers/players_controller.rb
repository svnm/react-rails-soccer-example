class PlayersController < ApplicationController
  def index
    @players = Player.all
  end

  def show
    @player = Player.find(params[:id])
    render json: @player
  end
end
