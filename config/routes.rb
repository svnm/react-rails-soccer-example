Rails.application.routes.draw do
  resources :teams
  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  namespace :cms do
    resources :teams
  end
end
