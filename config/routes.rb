Rails.application.routes.draw do
  resources :radars do
    resources :votes
  end
end
