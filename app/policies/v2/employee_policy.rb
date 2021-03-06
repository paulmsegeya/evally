# frozen_string_literal: true

module V2
  class EmployeePolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        return scope.all if user.admin?

        user.employees
      end
    end

    def archived?
      user.admin?
    end

    def create?
      user.admin?
    end

    def update?
      user.admin?
    end

    def overview?
      user.admin?
    end

    def archive?
      user.admin?
    end

    def destroy?
      user.admin?
    end
  end
end
