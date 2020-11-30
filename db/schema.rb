# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20201119151531) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "points"
    t.integer  "vote_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "axis_id"
    t.integer  "radar_id"
    t.index ["radar_id"], name: "index_answers_on_radar_id", using: :btree
  end

  create_table "axes", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "description",       default: "Sin descripcion"
    t.integer  "radar_template_id"
    t.index ["radar_template_id"], name: "index_axes_on_radar_template_id", using: :btree
  end

  create_table "radar_template_containers", force: :cascade do |t|
    t.text     "description"
    t.text     "name",                        null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "active",      default: true,  null: false
    t.integer  "owner_id"
    t.string   "show_code"
    t.boolean  "pinned",      default: false
    t.index ["owner_id"], name: "index_radar_template_containers_on_owner_id", using: :btree
  end

  create_table "radar_template_containers_users", id: false, force: :cascade do |t|
    t.integer "user_id",                     null: false
    t.integer "radar_template_container_id", null: false
    t.index ["user_id"], name: "index_radar_template_containers_users_on_user_id", using: :btree
  end

  create_table "radar_templates", force: :cascade do |t|
    t.text     "description",                                null: false
    t.text     "name",                                       null: false
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.boolean  "active",                      default: true, null: false
    t.integer  "owner_id",                                   null: false
    t.integer  "radar_template_container_id"
    t.index ["owner_id"], name: "index_radar_templates_on_owner_id", using: :btree
    t.index ["radar_template_container_id"], name: "index_radar_templates_on_radar_template_container_id", using: :btree
  end

  create_table "radar_templates_users", id: false, force: :cascade do |t|
    t.integer "user_id",           null: false
    t.integer "radar_template_id", null: false
    t.index ["radar_template_id"], name: "index_radar_templates_users_on_radar_template_id", using: :btree
    t.index ["user_id"], name: "index_radar_templates_users_on_user_id", using: :btree
  end

  create_table "radars", force: :cascade do |t|
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.boolean  "active",            default: true
    t.text     "description",       default: "Sin Descripción", null: false
    t.text     "name",                                          null: false
    t.integer  "radar_template_id"
    t.integer  "voting_id"
    t.index ["radar_template_id"], name: "index_radars_on_radar_template_id", using: :btree
    t.index ["voting_id"], name: "index_radars_on_voting_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "uid"
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "provider",       null: false
    t.bigint   "max_containers"
    t.index ["uid"], name: "index_users_on_uid", using: :btree
  end

  create_table "votes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "votings", force: :cascade do |t|
    t.integer  "radar_template_container_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.datetime "ends_at"
    t.string   "code"
    t.index ["radar_template_container_id"], name: "index_votings_on_radar_template_container_id", using: :btree
  end

end
