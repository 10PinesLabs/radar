Rails.application.routes.draw do
  resources :radars, only: [:create, :show, :index] do
    resources :votes, only: [:create]
    member do
      get :result
      post :create
      post :close
    end
  end
  root to: 'application#angular'
end
