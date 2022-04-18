import Vue from 'vue'
import { HOME_VIEW_NAME, CREATE_VIEW_NAME, VIEW_NAMES, API_PATH } from '../constants'

export const VIEW_LOADED_ACTION = 'VIEW_LOADED_ACTION'
export const DATA_IS_LOADING_ACTION = 'DATA_IS_LOADING_ACTION'
export const DATA_DONE_LOADING_ACTION = 'DATA_DONE_LOADING_ACTION'
export const NEW_MEETING_CREATION_ACTION = 'NEW_MEETING_CREATION_ACTION'
export const TOGGLE_PREVIEW_PANE_ACTION = 'TOGGLE_PREVIEW_PANE_ACTION'
export const SUBMIT_PREVIEW_FILE_URL_ACTION = 'SUBMIT_PREVIEW_FILE_URL_ACTION'

const SET_PREVIEW_FILE_URL_MUTATION = 'SET_PREVIEW_FILE_URL_MUTATION'
const SET_PREVIEW_PANE_MUTATION = 'SET_PREVIEW_PANE_MUTATION'
const SET_LOADING_MUTATION = 'SET_LOADING_MUTATION'
const SET_LOADING_MESSAGE_MUTATION = 'SET_LOADING_MESSAGE_MUTATION'
const SET_CURRENT_MEETING_MUTATION = 'SET_CURRENT_MEETING_MUTATION'

export const state = () => ({
  loading: false,
  loadingMessage: null,
  showPreviewPane: false,
  previewFileUrl: null,
  currentMeeting: null,
})

const apiPost = async (axios, url, payload) => (await axios.$post(url, payload))

export const actions = {
  async [NEW_MEETING_CREATION_ACTION] ({ commit }, payload) {
    const createdMeeting = (await apiPost(this.$axios, API_PATH + 'meetings', payload)).data
    commit(SET_CURRENT_MEETING_MUTATION, createdMeeting)
  },
  [DATA_IS_LOADING_ACTION] ({ commit }, message) {
    commit(SET_LOADING_MESSAGE_MUTATION, message)
    commit(SET_LOADING_MUTATION, true)
  },
  [DATA_DONE_LOADING_ACTION] ({ commit }) {
    commit(SET_LOADING_MESSAGE_MUTATION, null)
    commit(SET_LOADING_MUTATION, false)
  },
  [TOGGLE_PREVIEW_PANE_ACTION] ({ commit }) {
    commit(SET_PREVIEW_PANE_MUTATION)
  },
  [SUBMIT_PREVIEW_FILE_URL_ACTION] ({ commit }, url) {
    commit(SET_PREVIEW_FILE_URL_MUTATION, url)
  },
  [VIEW_LOADED_ACTION] ({ state, commit }, { viewName, nuxtContent }) {
    if (!VIEW_NAMES.includes(viewName)) {
      throw new Error('Attempted to load an unknown view: ' + viewName)
    }
    if (viewName === HOME_VIEW_NAME) {
      // get data for index page
    }
    if (viewName === CREATE_VIEW_NAME) {
      // get data for Game stream view
    }
  },
}

export const mutations = {
  [SET_CURRENT_MEETING_MUTATION] (state, meeting) {
    Vue.set(state, 'currentMeeting', meeting)
  },
  [SET_LOADING_MESSAGE_MUTATION] (state, message) {
    Vue.set(state, 'loadingMessage', message)
  },
  [SET_LOADING_MUTATION] (state, isLoading) {
    Vue.set(state, 'loading', isLoading)
  },
  [SET_PREVIEW_FILE_URL_MUTATION] (state, url) {
    Vue.set(state, 'previewFileUrl', url)
  },
  [SET_PREVIEW_PANE_MUTATION] (state) {
    Vue.set(state, 'showPreviewPane', !state.showPreviewPane)
  },
}
