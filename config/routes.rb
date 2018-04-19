Rails.application.routes.draw do
  scope path: '/api' do
    devise_for :admins
    resources :radars, only: %i[create show index] do
      resources :votes, only: [:create]
      member do
        get :result
        post :create
        post :close
      end
    end

    match "/login" => 'auth#create', via: :post

  end
  root to: 'application#angular'
  match '*path' => 'application#angular', via: %i[get post]



end
