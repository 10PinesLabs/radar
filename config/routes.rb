Rails.application.routes.draw do
  resources :radars do
    resources :votes
    member do
      get :answers
    end
  end
  root to: 'application#angular'
end
