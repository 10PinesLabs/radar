Rails.application.routes.draw do
  post '/radars/:radar_id/votes' => 'votes#create'
  post '/radars' => 'radars#create'
end
