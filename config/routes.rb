Rails.application.routes.draw do
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  resources :users, only: [:create, :show, :index]

  resources :helps
  get 'helps', to: 'helps#index'

  # root 'pages#home'
  get 'pages/home'
  get 'pages/dashboard'
  get 'pages/index'
  root 'pages#index'

  resources :messages, only: [:new, :create]

  match '*pages', to: 'pages#home', via: :all
end
