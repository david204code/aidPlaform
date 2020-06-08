Rails.application.routes.draw do
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  resources :users, only: [:create, :show, :index]

  resources :helps
  get 'helps', to: 'helps#index'

  resources :accepted_helps
  get 'acceptedhelps', to: 'accepted_helps#index'

  root 'pages#home'
  get 'pages/home'
  get 'pages/dashboard'
  get 'pages/index'
  # root 'messages#index'

  # get 'messages', to: 'messages#index'
  # resources :messages, except: [:index]
  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]
  mount ActionCable.server => '/cable'

  match '*pages', to: 'pages#home', via: :all
end
