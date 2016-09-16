module Cms
  class TeamsController < ApplicationController
    before_filter :authenticate_user!

    def index
      @teams = Team.all
    end

    def create
      @team = Team.new(team_params)

      if @team.save
        render json: @team
      else
        render json @team.errors, status: :unprocessable_entity
      end
    end

    def show
      @team = Team.find(params[:id])
      render json: @team
    end

    def destroy
      @team = Team.find(params[:id])
      @team.destroy
      head :no_content
    end

    def update
      @team = Team.find(params[:id])
      if @team.update(team_params)
        render json: @team
      else
        render json: @team.errors, status: :unprocessable_entity
      end
    end

    private

    def team_params
      params.require(:team).permit(:name, :description)
    end
  end
end
