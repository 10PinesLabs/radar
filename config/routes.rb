Rails.application.routes.draw do

  scope path: '/api' do
    get '/admins/sign_in', to: 'application#angular'
    devise_for :admins, only: [:sessions]

    resources :radars, only: %i[show index] do
      resources :votes, only: [:create]
      member do
        get :result
        post :create
        post :close
      end
    end

    post '/radars', to: 'radars#create'
    #post 'admins/sign_in', to: 'devise/sessions#create'
    match '/admins/isLoggedIn' => 'radars#is_logged_in', via: %i[get]
    match '/admins/isNotLoggedIn' => 'radars#is_not_logged_in', via: %i[get]
    match '/admins/signOut' => 'radars#signout', via: %i[get]
  end

  root to: 'application#angular'
  match '*path' => 'application#angular', via: %i[get post]
end
