class RadarTemplatesController < OwnerableController

  before_action :ensure_authenticated!

  def create
    container = RadarTemplateContainer.find(params.require(:radar_template_container_id))
    axes = params.require(:axes).map { |axis| create_axis(axis) }
    name = params.require(:name)
    description = params.require(:description)
    radar_template = RadarTemplate.create!(axes: axes, name: name,
                                           description: description,
                                           radar_template_container: container,
                                           owner_id: @logged_user.id)
    render json: radar_template, logged_user: @logged_user, status: :created
  end

  def show
    radar_template_id = params.require(:id)
    if_ownerable_present radar_template_id do |template|
      render json: template, logged_user: @logged_user, status: :ok
    end
  end

  def index
    render json: @logged_user.accessible_radar_templates, logged_user: @logged_user , status: :ok
  end

  def share
    shared_user = User.find(params.require(:user_id))
    radar_template_id = params.require(:id)

    if_ownerable_present radar_template_id do |template|
      begin
        template.add_user(@logged_user, shared_user)
        render status: :ok, json: "El radar se compartio satisfactoriamente"
      rescue StandardError => error_message
        render status: :unauthorized, json: error_message
      end
    end

  end

  private

  def create_axis(axis)
    Axis.new(name: axis.require(:name), description: axis['description'])
  end

  def find_ownerable ownerable_id
    RadarTemplate.find(ownerable_id)
  end

  def not_found_message
    "No se encontro el radar template"
  end

end
