import pluginActions from './actions'
import vue from 'vue'
import axios from 'axios'
const state = {}

const actions = {
  [pluginActions.request]: ({ commit, dispatch }, { url, method, requestConfig, data, onSuccess, ...options }) => {
    commit(pluginActions.request, options)
    axios({ method: method || 'GET', url, data, ...requestConfig }).then(resp => {
      commit(pluginActions.success, { ...options, resp: resp })
      if (onSuccess) {
        const { dispatchAction, executeFunction, commitAction } = onSuccess
        if (dispatchAction) {
          dispatch(dispatchAction)
        }
        if (commitAction) {
          commit(commitAction)
        }
        if (executeFunction) {
          executeFunction(resp)
        }
      }
    }).catch(err => {
      commit(pluginActions.error, { ...options, err: err.response })
    })
  },
  [pluginActions.clear]: ({ commit }, keyPath) => {
    commit(pluginActions.clear, keyPath)
  }
}

const mutations = {
  [pluginActions.request]: (state, { keyPath }) => {
    const obj = { ...state[keyPath], state: 'loading' }
    vue.set(state, keyPath, obj)
  },
  [pluginActions.success]: (state, { keyPath, resp }) => {
    const obj = { ...state[keyPath], state: 'success', firstCallDone: true, resp }
    vue.set(state, keyPath, obj)
  },
  [pluginActions.error]: (state, { keyPath, err }) => {
    const obj = { ...state[keyPath], state: 'error', err }
    vue.set(state, keyPath, obj)
  },
  [pluginActions.clear]: (state, keyPath) => {
    const obj = {}
    vue.set(state, keyPath, obj)
  }
}

export const module = {
  state,
  actions,
  mutations
}

export default module
