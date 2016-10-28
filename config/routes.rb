Rails.application.routes.draw do
  resources :radars do
    resources :votes
    member do
      get :result
    end
  end
  root to: 'application#angular'
end
