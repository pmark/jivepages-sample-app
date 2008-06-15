# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of ActiveRecord to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 3) do

  create_table "boxes", :force => true do |t|
    t.integer  "jivepage_id"
    t.integer  "column_id"
    t.text     "content"
    t.integer  "position"
    t.string   "cell_kind",   :limit => 25
    t.string   "target"
    t.string   "state",       :limit => 50
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "columns", :force => true do |t|
    t.integer  "row_id"
    t.integer  "position"
    t.text     "full_content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contributorships", :force => true do |t|
    t.integer  "user_id"
    t.integer  "jivepage_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "edit_sessions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "jivepage_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "jivepages", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.integer  "subject_id"
    t.string   "subject_type"
    t.string   "width",        :limit => 12
    t.string   "sidebar",      :limit => 12
    t.string   "skin",         :limit => 24
    t.string   "layout",       :limit => 24
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "site_id"
  end

  create_table "page_changes", :force => true do |t|
    t.integer  "edit_session_id"
    t.text     "content"
    t.text     "script"
    t.string   "marker_element_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", :force => true do |t|
    t.string   "name",              :limit => 40
    t.string   "authorizable_type", :limit => 30
    t.integer  "authorizable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles_users", :id => false, :force => true do |t|
    t.integer  "user_id"
    t.integer  "role_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rows", :force => true do |t|
    t.integer  "jivepage_id"
    t.text     "body"
    t.string   "section",     :limit => 12
    t.integer  "position"
    t.string   "grid_type",   :limit => 12
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sites", :force => true do |t|
    t.string   "title",       :limit => 100
    t.string   "description"
    t.string   "text"
    t.string   "host",        :limit => 100
    t.string   "cname"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "email"
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_token"
    t.datetime "remember_token_expires_at"
    t.string   "activation_code",           :limit => 40
    t.datetime "activated_at"
  end

end
