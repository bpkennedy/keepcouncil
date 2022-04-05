import Vue from 'vue'
import { HOME_VIEW_NAME, VIEW_NAMES } from '../constants'

export const VIEW_LOADED_ACTION = 'VIEW_LOADED_ACTION'
export const DATA_IS_LOADING_ACTION = 'DATA_IS_LOADING_ACTION'
export const DATA_DONE_LOADING_ACTION = 'DATA_DONE_LOADING_ACTION'

const SET_LOADING_MUTATION = 'SET_LOADING_MUTATION'

export const state = () => ({
  loading: false,
})

export const actions = {
  [DATA_IS_LOADING_ACTION] ({ commit }) {
    commit(SET_LOADING_MUTATION, true)
  },
  [DATA_DONE_LOADING_ACTION] ({ commit }) {
    commit(SET_LOADING_MUTATION, false)
  },
  [VIEW_LOADED_ACTION] ({ state, commit }, { viewName, nuxtContent }) {
    if (!VIEW_NAMES.includes(viewName)) {
      throw new Error('Attempted to load an unknown view: ' + viewName)
    }
    if (viewName === HOME_VIEW_NAME) {
      // get data for index page
    }
    // if (viewName === GAME_VIEW_NAME) {
    //   // get data for Game stream view
    // }
  },
}

export const mutations = {
  [SET_LOADING_MUTATION] (state, isLoading) {
    Vue.set(state, 'loading', isLoading)
  },
}
