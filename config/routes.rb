Rails.application.routes.draw do
  scope path: '/api' do
    resources :radar_template_containers, only: %i[index show create destroy] do
      member do
        post 'share', to: "radar_template_containers#share"
        post 'clone', to: "radar_template_containers#clone"
        post 'pin', to: "radar_template_containers#pin"
        put 'edit', to: "radar_template_containers#edit"
        put 'open', to: "radar_template_containers#open"
      end
      resources :votings, only: [:create]
    end

    resources :radar_templates, only: %i[create show destroy index share] do
      resources :votes, only: [:create]
      member do
        post 'share/:user_id', to: "radar_templates#share"
      end
    end
    resources :radars, only: %i[create show index] do
      member do
        get :result
        post :create
        post :close
      end
    end
  end

  get 'api/votings', to: "votings#show_by_code"
  put 'api/votings/:radar_template_container_id', to: "votings#close"

  get 'auth/:provider/callback', to: "omni_auth#callback"
  get 'auth/:provider/redirect', to: "omni_auth#redirect"
  get '/me', to: "session#user"
  get 'api/users', to: 'users#users'
end
