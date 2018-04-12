Rails.application.routes.draw do
  # buscar en public, si esta lo devuelvo
  scope path: '/api' do
    resources :radars, only: %i[create show index] do
      resources :votes, only: [:create]
      member do
        get :result
        post :create
        post :close
      end
    end
  end
  root to: 'application#angular'
  match '*path' => 'application#angular', via: %i[get post]
end
