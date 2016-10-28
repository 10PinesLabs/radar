Rails.application.routes.draw do
  resources :radars, only: [:create, :show] do
    resources :votes, only: [:create]
    member do
      get :result
      post :close
    end
  end
  root to: 'application#angular'
end
