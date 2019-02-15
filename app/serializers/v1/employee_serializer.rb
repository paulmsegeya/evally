module V1
  class EmployeeSerializer < Blueprinter::Base
    identifier :id

    fields :first_name, :last_name, :public_token, :position, :group, :state, :hired_at, :next_evaluation_at, :released_at

    field :skill, if: ->(employee, _options) { employee.skill.present? }

    view :evaluated do
      association :latest_evaluation, name: :evaluation, blueprint: V1::EvaluationSerializer, default: {}
    end
  end
end
