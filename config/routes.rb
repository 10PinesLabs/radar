Rails.application.routes.draw do
  resources :radars, only: [:create, :show] do
    resources :votes, only: [:create]
    member do
      post :close
    end
  end
  root to: 'application#angular'
end
