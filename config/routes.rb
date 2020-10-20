Rails.application.routes.draw do
  scope path: '/api' do
    resources :radar_template_containers, only: %i[index show create] do
      member do
        post :close
        post 'share/:user_id', to: "radar_template_containers#share"
      end
      resources :votings, only: [:create]
    end

    resources :radar_templates, only: %i[create show index share] do
      member do
        post 'share/:user_id', to: "radar_templates#share"
      end
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

  get 'api/votings', to: "votings#show_by_code"

  get 'auth/:provider/callback', to: "omni_auth#callback"
  get 'auth/:provider/redirect', to: "omni_auth#redirect"
  get '/me', to: "session#user"
end
