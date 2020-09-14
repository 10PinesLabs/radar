Rails.application.routes.draw do
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
  get 'auth/:provider/callback', to: "omni_auth#callback"
  get 'auth/:provider/redirect', to: "omni_auth#redirect"
end
