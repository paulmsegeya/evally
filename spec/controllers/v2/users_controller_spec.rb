# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V2::UsersController, type: :controller do
  let(:admin) { create(:user, role: 'admin') }
  let(:evaluator) { create(:user, role: 'evaluator') }

  describe '#index' do
    context 'when unauthorized' do
      it 'responds with 401 error' do
        get :index
        expect(response).to have_http_status 401
      end

      it 'responds with 403 error' do
        sign_in evaluator

        get :index
        expect(response).to have_http_status 403
      end
    end

    context 'when authorized' do
      it 'responds with empty users' do
        sign_in admin
        get :index

        expect(response).to have_http_status 200
      end
    end
  end

  describe '#update' do
    context 'when unauthorized' do
      it 'responds with 401 error' do
        params = {
          id: 1,
          user: {
            first_name: 'New name'
          }
        }

        put :update, params: params

        expect(response).to have_http_status 401
      end

      it 'responds with 403 error' do
        params = {
          id: 1,
          user: {
            first_name: 'New name'
          }
        }

        sign_in evaluator
        put :update, params: params

        expect(response).to have_http_status 403
      end
    end

    context 'when authorized' do
      it 'responds with updated user' do
        user = FactoryBot.create(:user, first_name: 'Rob')

        params = {
          id: user.id,
          user: {
            first_name: 'Jack'
          }
        }

        sign_in admin
        put :update, params: params

        expect(response).to have_http_status 200
        expect(response.body).to be_json_eql user_schema(user.reload)
      end

      it 'creates proper activity' do
        user = FactoryBot.create(:user, first_name: 'Rob', last_name: 'Doe')

        params = {
          id: user.id,
          user: {
            first_name: 'Jack'
          }
        }

        sign_in admin

        expect do
          put :update, params: params
        end.to(change { Activity.count }.by(1))

        expect(Activity.last).to have_attributes(
          action: 'update',
          activable_name: 'Jack Doe'
        )
      end

      it 'responds with validation error' do
        user = FactoryBot.create(:user)

        params = {
          id: user.id,
          user: {
            first_name: ''
          }
        }

        sign_in admin

        put :update, params: params

        expect(response).to have_http_status 422
        expect(json_response['details'].first).to eq 'First name can\'t be blank'
      end

      it 'responds with not found error' do
        params = {
          id: 0,
          user: {
            first_name: 'Jack'
          }
        }

        sign_in admin
        put :update, params: params

        expect(response).to have_http_status 404
      end
    end
  end
end
