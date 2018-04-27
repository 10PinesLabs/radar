module ControllerHelpers
  def login_with(admin = double('admin'), scope = :admin)
    current_admin = "current_#{scope}".to_sym
    if admin.nil?
      allow(request.env['warden']).to receive(:authenticate!).and_throw(:warden, {:scope => scope})
      allow(controller).to receive(current_admin).and_return(nil)
    else
      allow(request.env['warden']).to receive(:authenticate!).and_return(admin)
      allow(controller).to receive(current_admin).and_return(admin)
    end
  end
end