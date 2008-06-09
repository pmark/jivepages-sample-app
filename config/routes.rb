ActionController::Routing::Routes.draw do |map|
  map.resources :users

  map.resource :session

  map.resources :users
  map.resource :session
  # map.from_plugin :jivepages
  map.resources :jivepages
  map.resources :sites
  map.resources :rows, :member => {:up => :put, :down => :put}
  map.resources :columns
  map.resources :boxes
  map.resources :page_changes
  map.resources :edit_sessions
  map.resources :contributorship

  map.root :controller => "jivepages", :action => "index"

  #map.connect ':controller/:action/:id'
  #map.connect ':controller/:action/:id.:format'
end
