module V1
  class TemplateSerializer
    include FastJsonapi::ObjectSerializer

    attributes :name, :state

    attribute :sections_attributes do |template|
      # template.sections.select(:id, :name, :group, :width, :position, :skills).map(&:attributes)
      template.sections.map{ |section| section.attributes.slice('id', 'name', 'group', 'width', 'position', 'skills') }
    end

  end
end
