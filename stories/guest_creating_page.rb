require File.dirname(__FILE__) + "/helper"

with_steps_for(:guest_creating_page) do
  run_local_story "guest_creating_page.txt", :type => RailsStory
end