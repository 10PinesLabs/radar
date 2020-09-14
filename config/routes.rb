Rails.application.routes.draw do
  scope path: '/api' do
    resources :radar_templates, only: %i[create show index] do

    end
    resources :radars, only: %i[create show index] do
      resources :votes, only: [:create]
      member do
        get :result
        post :create
        post :close
      end
    end
  end
  get 'auth/backoffice/callback', to: "omni_auth#callback"
  get 'auth/backoffice/redirect', to: "omni_auth#redirect"
end
