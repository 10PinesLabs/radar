require 'rails_helper'

RSpec.describe RadarTemplate, type: :model do

  let(:radar_template){create :radar_template, owner: owner}
  let(:owner){create :user}
  let(:user){create :user}

  describe '#is_owned_by?' do

    subject do
      radar_template.is_owned_by? user
    end

    context 'si el usuario posee el radar template' do

      before do
        radar_template.update!(owner: user)
      end

      it 'devuelve true' do
        expect(subject).to be true
      end
    end

    context 'si el usuario no posee el radar template' do
      it 'devuelve false' do
        expect(subject).to be false

      end
    end

  end

  describe '#is_know_by?' do
    it 'al crearse el template es conocido por su dueño' do
      expect(radar_template.is_known_by? owner).to be true
    end

    it 'al crearse el template no es conocido por otro usuario' do
      expect(radar_template.is_known_by? user).to be false
    end
  end

  describe '#agregar_usuario ' do
    subject do
      radar_template.add_user owner, user
    end

    context 'en caso de exito' do

      it 'lo agrega a la coleccion' do
        subject
        expect(radar_template.users).to contain_exactly(user)
      end

      it 'el usuario lo conoce' do
        subject
        expect(user.radar_templates).to contain_exactly(radar_template)
      end

    end

    context 'si el owner no posee el radar template ' do
      let(:otro_owner){create :user}

      subject do
        radar_template.add_user otro_owner, user
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
