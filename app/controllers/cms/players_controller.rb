module Cms
  class PlayersController < ApplicationController
    before_filter :authenticate_user!

    def index
      @players = Player.all
    end

    def create
      @player = Player.new(player_params)

      if @player.save
        render json: @player
      else
        render json @player.errors, status: :unprocessable_entity
      end
    end

    def show
      @player = Player.find(params[:id])
      render json: @player
    end

    def destroy
      @player = Player.find(params[:id])
      @player.destroy
      head :no_content
    end

    def update
      @player = Player.find(params[:id])
      if @player.update(player_params)
        render json: @player
      else
        render json: @player.errors, status: :unprocessable_entity
      end
    end

    private

    def player_params
      params.require(:player).permit(:name)
    end
  end
end
