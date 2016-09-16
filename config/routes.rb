Rails.application.routes.draw do
  devise_for :users
  get 'hello_world', to: 'hello_world#index'
  resources :teams

  namespace :cms do
    resources :teams
    resources :players
  end
end
