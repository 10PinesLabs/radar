class AddPinnedToRadarTemplateContainer < ActiveRecord::Migration[5.0]
  def change
    add_column :radar_template_containers,
               "pinned",
               :boolean,
               { default: false }
  end
end
