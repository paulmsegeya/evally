<template>
  <div class="search-box">
    <div class="search-box__input">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('components.templates.sidebar.search')"
        filled
      />
    </div>

    <div class="search-box__list">
      <v-list two-line subheader>
        <v-subheader>{{ $t('components.templates.sidebar.subheader') }}</v-subheader>

        <div v-if="loading" class="box__loader">
          <v-progress-circular :size="30" :width="3" color="primary" indeterminate />
        </div>

        <template v-else>
          <v-list-item
            v-for="template in searchedTemplates"
            :key="template.id"
            :to="template.path"
            color="secondary"
          >
            <v-list-item-content>
              <v-list-item-title>{{ template.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('components.templates.sidebar.createdBy', { name: template.creator_fullname }) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="searchedTemplates.length === 0">
            <v-list-item-action>
              <v-icon>mdi-alert-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.templates.sidebar.noContent') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import { TemplatesList } from '@models/template'

export default {
  name: 'TemplatesSearchList',
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false
    },
    templates: {
      type: TemplatesList,
      required: true,
      default: () => new TemplatesList()
    }
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    searchedTemplates() {
      if (this.search.length === 0) return this.templates.models

      return this.templates.models.filter(template => (
        template.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      ))
    }
  }
}
</script>
