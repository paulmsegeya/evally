# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Recruit, type: :model do
  it { is_expected.to belong_to(:evaluator).class_name('User').optional }

  it do
    is_expected.to have_many(:recruitment_documents)
               .with_primary_key('external_id')
               .with_foreign_key('encrypted_email')
               .dependent(:destroy)
  end

  it { is_expected.to validate_presence_of(:external_id) }
end
