require 'rails_helper'

RSpec.describe OmniAuthController, type: :controller do
  context 'When a redirect to login is requested' do
    subject do
      get :redirect, params: provider_param
    end

    context 'with backoffice' do

      before do
        request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:backoffice]
      end

      def provider_param
        {provider:'backoffice'}
      end


      it 'the request should redirect' do
        expect(subject).to have_http_status :redirect
      end

      it 'the request should redirect to backooffice site' do
        backoffice_auth_url = ENV['BACKOFFICE_URL'] + '/auth/sign_in?redirect_url='
        test_app_url = 'http://localhost:3000/auth/backoffice/callback&app_id=radar-app'
        backoffice_auth_url_with_redirect = backoffice_auth_url + test_app_url
        expect(subject).to redirect_to(backoffice_auth_url_with_redirect)
      end

    end

    context 'with google' do

      before do
          request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
      end

      def provider_param
        {provider:'google'}
      end


      it 'the request should redirect' do
        expect(subject).to have_http_status :redirect
      end

      it 'the request should redirect to GOOGLE site' do
        expect(subject).to redirect_to("http://test.host/auth/google_oauth2")
      end

    end
  end

  context 'When a callback is called from' do
    subject do
      get :callback, params: provider_param
    end

      context 'backoffice' do

        before do
          allow(controller).to receive(:login_user)
          allow(controller).to receive(:generate_token).and_return('token')
          request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:backoffice]
        end

        def provider_param
          {provider:'backoffice'}
        end


        it 'the request should redirect' do
          expect(subject).to have_http_status :redirect
        end

        context 'with a root user' do
          it 'should succsesfuly login' do
            expect(controller).to receive(:login_user).exactly(1).time
          end
        end

      end

    end

  end
