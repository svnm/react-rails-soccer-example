Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resources :teams

  namespace :cms do
    resources :teams
  end
end
