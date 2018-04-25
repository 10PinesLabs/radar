Rails.application.routes.draw do

  scope path: '/api' do
    devise_for :admins

    resources :radars, only: %i[show index] do
      resources :votes, only: [:create]
      member do
        get :result
        post :create
        post :close
      end
    end

    post '/radars', to: 'radars#create'
    match '/isLoggedIn' => 'radars#isloggedin', via: %i[get]
    match '/signOut' => 'radars#signout', via: %i[get]
  end

  get '/radars', to: 'application#check_admin_permission'
  get '/createRadar', to: 'application#check_admin_permission'
  get '/radars/:radar_id/vote', to: 'application#check_not_admin_permission'

  root to: 'application#angular'
  match '*path' => 'application#angular', via: %i[get post]
end
