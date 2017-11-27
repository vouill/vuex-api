import pluginActions from './actions'
import vue from 'vue'
import axios from 'axios'
const { CancelToken } = axios

const state = {}

// used for request cancelation
const previousStateRequest = { cancel: null, url: null, state: 'finished' }

const actions = {
  [pluginActions.request]: ({ commit, dispatch }, { url, method, requestConfig, data, params, onSuccess, ...options }) => {
    return new Promise((resolve, reject) => {
      commit(pluginActions.request, options)
      if (url === previousStateRequest.url && previousStateRequest.state === 'started') {
        previousStateRequest.cancel()
      }
      previousStateRequest.url = url
      previousStateRequest.state = 'started'
      axios({ method: method || 'GET',
        url,
        data,
        params,
        cancelToken: new CancelToken(c => {
          previousStateRequest.cancel = c
        }),
        ...requestConfig }).then(resp => {
          previousStateRequest.state = 'finished'

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
          resolve(resp)
        }).catch(err => {
          if (axios.isCancel(err)) {
            console.error('Same concurrent req cancel')
          }
          commit(pluginActions.error, { ...options, err: err.response })
          reject(err)
        })
    })
  },
  [pluginActions.clear]: ({ commit }, keyPath) => {
    return new Promise((resolve, reject) => {
      commit(pluginActions.clear, keyPath)
      resolve()
    })
  }
}

const mutations = {
  [pluginActions.request]: (state, { keyPath }) => {
    const obj = { ...state[keyPath], status: 'loading' }
    vue.set(state, keyPath, obj)
  },
  [pluginActions.success]: (state, { keyPath, resp }) => {
    delete resp.config // make this configurable
    const obj = { ...state[keyPath], status: 'success', firstCallDone: true, resp }
    vue.set(state, keyPath, obj)
  },
  [pluginActions.error]: (state, { keyPath, err }) => {
    const obj = { ...state[keyPath], status: 'error', err }
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
