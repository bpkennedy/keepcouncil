import Vue from 'vue'
import { HOME_VIEW_NAME, EDIT_VIEW_NAME, VIEW_NAMES, API_PATH } from '../constants'

export const VIEW_LOADED_ACTION = 'VIEW_LOADED_ACTION'
export const DATA_IS_LOADING_ACTION = 'DATA_IS_LOADING_ACTION'
export const DATA_DONE_LOADING_ACTION = 'DATA_DONE_LOADING_ACTION'
export const NEW_MEETING_CREATION_ACTION = 'NEW_MEETING_CREATION_ACTION'
export const SELECTED_CURRENT_MEETING_ACTION = 'SELECTED_CURRENT_MEETING_ACTION'
export const TOGGLE_PREVIEW_PANE_ACTION = 'TOGGLE_PREVIEW_PANE_ACTION'
export const SUBMIT_PREVIEW_FILE_URL_ACTION = 'SUBMIT_PREVIEW_FILE_URL_ACTION'
export const MEETINGS_VIEW_LOADED_ACTION = 'MEETINGS_VIEW_LOADED_ACTION'
export const EDIT_VIEW_LOADED_ACTION = 'EDIT_VIEW_LOADED_ACTION'

const SET_PREVIEW_FILE_URL_MUTATION = 'SET_PREVIEW_FILE_URL_MUTATION'
const SET_PREVIEW_PANE_MUTATION = 'SET_PREVIEW_PANE_MUTATION'
const SET_LOADING_MUTATION = 'SET_LOADING_MUTATION'
const SET_LOADING_MESSAGE_MUTATION = 'SET_LOADING_MESSAGE_MUTATION'
const SET_CURRENT_MEETING_MUTATION = 'SET_CURRENT_MEETING_MUTATION'
const SET_MEETINGS_MUTATION = 'SET_MEETINGS_MUTATION'

export const state = () => ({
  loading: false,
  loadingMessage: null,
  showPreviewPane: false,
  previewFileUrl: null,
  currentMeeting: null,
  meetings: [],
})

const apiPost = async (axios, url, payload) => (await axios.$post(url, payload))
const apiGet = async (axios, url) => (await axios.$get(url))

export const actions = {
  async [SELECTED_CURRENT_MEETING_ACTION] ({ commit }, meetingId) {
    const meeting = (await apiGet(this.$axios, `${API_PATH}meeting/${meetingId}`))
    commit(SET_CURRENT_MEETING_MUTATION, meeting)
  },
  async [NEW_MEETING_CREATION_ACTION] ({ dispatch }, payload) {
    const createdMeeting = (await apiPost(this.$axios, API_PATH + 'meetings', payload))
    dispatch(MEETINGS_VIEW_LOADED_ACTION)
    dispatch(SELECTED_CURRENT_MEETING_ACTION, createdMeeting.id)
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
  async [MEETINGS_VIEW_LOADED_ACTION] ({ commit }) {
    const meetings = (await apiGet(this.$axios, API_PATH + 'meetings'))
    commit(SET_MEETINGS_MUTATION, meetings)
  },
  async [EDIT_VIEW_LOADED_ACTION] ({ dispatch }) {
    const loadedMeeting = (await apiGet(this.$axios, `${API_PATH}meeting/${this.$router.currentRoute.params.id}`))
    if (loadedMeeting) {
      dispatch(SELECTED_CURRENT_MEETING_ACTION, loadedMeeting.id)
    } else {
      this._vm.$toast({
        title: 'Error',
        description: `Unable to load meeting ${this.$router.currentRoute.params.id}. It may not exist or may be deleted.`,
        status: 'error',
        duration: 10000,
      })
    }
  },
  [VIEW_LOADED_ACTION] ({ state, commit, dispatch }, { viewName, nuxtContent }) {
    if (!VIEW_NAMES.includes(viewName)) {
      throw new Error('Attempted to load an unknown view: ' + viewName)
    }
    if (viewName === HOME_VIEW_NAME) {
      dispatch(MEETINGS_VIEW_LOADED_ACTION)
    }
    if (viewName === EDIT_VIEW_NAME) {
      dispatch(EDIT_VIEW_LOADED_ACTION)
    }
  },
}

export const mutations = {
  [SET_MEETINGS_MUTATION] (state, meetings) {
    Vue.set(state, 'meetings', meetings)
  },
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
