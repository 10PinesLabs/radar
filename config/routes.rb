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

  # Estas validaciones deberian estar del lado de angular porque son del frontend,
  # pero hay que estudiar mejor que devuelve la gema devise para poder manejarlo desde ahi.
  # El problema surge que parado desde angular no encontre informacion para decidir si estoy
  # loggeado o no.
  get '/radars', to: 'application#check_admin_permission'
  get '/createRadar', to: 'application#check_admin_permission'
  get '/radars/:radar_id/vote', to: 'application#check_not_admin_permission'

  root to: 'application#angular'
  match '*path' => 'application#angular', via: %i[get post]
end
