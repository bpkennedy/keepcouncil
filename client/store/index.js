import Vue from 'vue'
import { HOME_VIEW_NAME, CREATE_VIEW_NAME, VIEW_NAMES } from '../constants'

export const VIEW_LOADED_ACTION = 'VIEW_LOADED_ACTION'
export const DATA_IS_LOADING_ACTION = 'DATA_IS_LOADING_ACTION'
export const DATA_DONE_LOADING_ACTION = 'DATA_DONE_LOADING_ACTION'
export const TOGGLE_PREVIEW_PANE_ACTION = 'TOGGLE_PREVIEW_PANE_ACTION'
export const SUBMIT_PREVIEW_FILE_URL_ACTION = 'SUBMIT_PREVIEW_FILE_URL_ACTION'

const SET_PREVIEW_FILE_URL_MUTATION = 'SET_PREVIEW_FILE_URL_MUTATION'
const SET_PREVIEW_PANE_MUTATION = 'SET_PREVIEW_PANE_MUTATION'
const SET_LOADING_MUTATION = 'SET_LOADING_MUTATION'

export const state = () => ({
  loading: false,
  showPreviewPane: false,
  previewFileUrl: null,
})

export const actions = {
  [DATA_IS_LOADING_ACTION] ({ commit }) {
    commit(SET_LOADING_MUTATION, true)
  },
  [DATA_DONE_LOADING_ACTION] ({ commit }) {
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
