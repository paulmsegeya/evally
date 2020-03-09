import http from '@utils/http'
import { fetchError } from '@utils/helpers'

import i18n from '@locales/i18n'

import { RecruitDocument, RecruitDocumentsList } from '@models/recruit_document'
import { TemplatesList } from '@models/template'

const initialState = () => ({
  recruitDocuments: new RecruitDocumentsList(),
  recruitDocument: new RecruitDocument(),
  templates: new TemplatesList(),
  groups: [],
  statuses: [],
  positions: [],
  loading: true
})

const RecruitDocumentsModule = {
  namespaced: true,

  state: initialState(),

  getters: {
    recruitDocuments: state => state.recruitDocuments,
    recruitDocument: state => state.recruitDocument,
    templates: state => state.templates,
    groups: state => state.groups,
    statuses: state => state.statuses,
    positions: state => state.positions,
    loading: state => state.loading
  },

  mutations:{
    setLoading(state, status) {
      state.loading = status
      return state
    },
    setList(state, { recruit_documents, groups, statuses, positions }) {
      state.recruitDocuments = new RecruitDocumentsList(recruit_documents)
      state.groups = groups
      state.statuses = statuses
      state.positions = positions
      state.loading = false
      return state
    },
    setItem(state, { recruit_document, templates }) {
      state.recruitDocument = new RecruitDocument(recruit_document)
      state.templates = new TemplatesList(templates)
      state.loading = false
      return state
    },
    resetState(state) {
      state = Object.assign(state, initialState())
      return state
    },
    addToList(state, recruitDocument) {
      state.recruitDocuments.add(recruitDocument)
      return state
    },
  },

  actions: {
    index({ commit }) {
      commit('setLoading', true)

      http.get(RecruitDocument.routes.recruitDocumentsPath)
        .then(response => {
          commit('setList', response.data)
        })
        .catch(error => {
          commit(
            'NotificationsModule/push',
            { error: i18n.t('messages.recruitments.index.error', { msg: fetchError(error) }) },
            { root: true }
          )
        })
        .finally(() => commit('setLoading', false))
    },
    filterIndex({ commit }, filters) {
      commit('setLoading', true)

      http.get(RecruitDocument.routes.recruitDocumentsFilterPath(filters))
        .then(response => {
          commit('setList', response.data)
        })
        .catch(error => {
          commit(
            'NotificationsModule/push',
            { error: i18n.t('messages.recruitments.index.error', { msg: fetchError(error) }) },
            { root: true }
          )
        })
        .finally(() => commit('setLoading', false))
    },
    show({ commit }, id) {
      commit('setLoading', true)

      http.get(RecruitDocument.routes.recruitDocumentPath(id))
        .then(response => {
          commit('setItem', response.data)
        })
        .catch(error => {
          commit(
            'NotificationsModule/push',
            { error: i18n.t('messages.recruitments.show.error', { msg: fetchError(error) }) },
            { root: true }
          )
        })
    },
    new({ commit }) {
      commit('setLoading', true)
      http.get(RecruitDocument.routes.newRecruitDocumentsPath)
        .then(response => {
          commit('setList', response.data)
        })
        .catch(error => {
          commit(
            'NotificationsModule/push',
            { error: i18n.t('messages.recruitments.show.error', { msg: fetchError(error) }) },
            { root: true }
          )
        })
    },
    create({ commit }, recruitDocument ) {
      const params = {
        recruit_document: recruitDocument.attributes
      }

      return new Promise(resolve => {
        http.post(RecruitDocument.routes.recruitDocumentsPath, params)
          .then(response => {
            const { data } = response

            commit('addToList', data)
            commit(
              'NotificationsModule/push',
              { success: i18n.t('messages.recruitments.create.ok') },
              { root: true }
            )
            resolve(data)
          })
          .catch(error => {
            commit(
              'NotificationsModule/push',
              { error: i18n.t('messages.recruitments.create.error', { msg: fetchError(error) }) },
              { root: true }
            )

          })
      })
    }
  }
}

export default RecruitDocumentsModule
