require 'rails_helper'

RSpec.describe RadarTemplate, type: :model do
  describe '#agregar_usuario ' do
    subject do
      radar_template.agregar_usuario owner, user
    end

    let(:radar_template){create :radar_template, owner: owner}
    let(:owner){create :user}
    let(:user){create :user}

    context 'en caso de exito' do

      it 'lo agrega a la coleccion' do
        subject
        expect(radar_template.users).to contain_exactly(user)
      end

      it 'el usuario lo posee' do
        subject
        expect(user.radar_templates).to contain_exactly(radar_template)
      end
    end

    context 'si el owner no posee el radar template ' do
      let(:otro_owner){create :user}

      subject do
        radar_template.agregar_usuario otro_owner, user
      end
      it 'lanza el error correcto' do
        radar_template
        expect {subject}.to raise_error(RadarTemplate::OWNER_ERROR)
      end

      it 'no agrega el usuario a la coleccion' do
        subject rescue nil
        expect(radar_template.users.size).to eq 0
      end

    end

    context 'si el usuario ya lo posee' do
      before do
        subject
      end

      it 'no lo vuelve a agregar' do
        subject
        expect(radar_template.users.size).to eq 1
      end
    end

  end
end
