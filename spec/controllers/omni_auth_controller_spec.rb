require 'rails_helper'

RSpec.describe OmniAuthController, type: :controller do
  context 'When a redirect to login is requested' do
    subject do
      get :redirect, params: provider_param
    end

    let(:provider_param){
      {provider: provider_name}
    }


    context 'with backoffice' do
      let(:provider_name){ "backoffice" }

      it 'the request should redirect' do
        expect(subject).to have_http_status :redirect
      end

      it 'the request should redirect to backoffice site' do
        backoffice_auth_url = ENV['BACKOFFICE_URL'] + '/auth/sign_in?redirect_url='
        test_app_url = 'http://localhost:3000/auth/backoffice/callback&app_id=radar-app'
        backoffice_auth_url_with_redirect = backoffice_auth_url + test_app_url
        expect(subject).to redirect_to(backoffice_auth_url_with_redirect)
      end

    end

    context 'with google' do
      let(:provider_name){ "google" }

      it 'the request should redirect' do
        expect(subject).to have_http_status :redirect
      end

      it 'the request should redirect to GOOGLE site' do
        expect(subject).to redirect_to("http://test.host/auth/google_oauth2")
      end

    end

    context 'with invalid provider' do
      let(:provider_name){ "unknown" }

      it 'the request should return not found' do
        expect(subject).to have_http_status :not_found
      end

      it 'the request should return error' do
        subject
        expect(JSON.parse(response.body)['errors']).to eq('Proveedor de autenticacion invalido')
      end

    end
  end

  context 'When the provider callback is recived' do
    subject do
      get :callback, params: provider_param
    end

    let(:provider_param){
      {provider: provider_name}
    }

    let(:provider_name){'google_oauth2'}

    before do
      request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
    end

    it 'redirects the user to the token url' do
      expect(should).to redirect_to match(ENV['DOMAIN_BASE_URL'] + '/token/')
    end

    context 'if the user does not exist yet' do
      it 'creates it with the passed parameters' do
        expect{ subject }.to change{User.count}.by 1
        expected_user = User.find_by_uid('54321')
        expect(expected_user.provider).to eq 'google_oauth2'
        expect(expected_user.name).to eq 'pino'
        expect(expected_user.email).to eq 'pino@pino.com'
      end
    end

    context 'and the provider is the backoffice' do
      let(:provider_name){'backoffice'}

      context 'if the logged user is not root' do
        before do
          request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:backoffice_noroot]
        end

        it 'redirects the user to the error page with the correct error messagge' do
          expect(subject).to redirect_to(ENV['DOMAIN_BASE_URL']+'/error?message=Esta funcionalidad es solo para roots')
        end

        it 'does not login the user' do
          expect(subject).not_to redirect_to %r(/token/)
        end
      end
    end
  end
  end
