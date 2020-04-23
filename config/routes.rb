Rails.application.routes.draw do
  
   resources :sessions, only: [:create]
  root 'pages#home'
  get 'pages/home'
  get 'pages/dashboard'
end
