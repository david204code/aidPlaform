Rails.application.routes.draw do
  
  resources :users, only: [:create, :show, :index]

  resources :helps

  root 'pages#home'
  get 'pages/home'
  get 'pages/dashboard'

  match '*pages', to: 'pages#home', via: :all
end
