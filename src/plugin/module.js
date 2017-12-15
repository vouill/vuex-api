import pluginActions from './actions'
import vue from 'vue'
import axios from 'axios'
import shallowEqual from './utils'

const { CancelToken } = axios

const state = {}

// used for request cancelation
const previousStateRequest = { cancel: null, url: null, params: {}, state: 'finished' }

const actions = {
  [pluginActions.request]: ({ commit, dispatch }, { requestConfig, ...otherConfig }) => {
    const { url, method, onSuccess, onError, keyPath, params } = otherConfig
    return new Promise((resolve, reject) => {
      commit(pluginActions.request, { keyPath })
      if (url === previousStateRequest.url && previousStateRequest.state === 'started' && shallowEqual(params, previousStateRequest.params)) {
        previousStateRequest.cancel()
      }
      previousStateRequest.url = url
      previousStateRequest.state = 'started'
      previousStateRequest.params = params
      axios({
        ...requestConfig,
        ...otherConfig,
        method: method || 'GET',
        url,
        cancelToken: new CancelToken(c => {
          previousStateRequest.cancel = c
        })
      }).then(resp => {
        previousStateRequest.state = 'finished'
        commit(pluginActions.success, { resp: resp, keyPath })
        if (onSuccess) {
          const { dispatchAction, executeFunction, commitAction } = onSuccess
          if (dispatchAction) {
            const { type, payload } = dispatchAction
            dispatch(type, payload)
          }
          if (commitAction) {
            const { type, payload } = commitAction
            commit(type, payload)
          }
          if (executeFunction) {
            executeFunction(resp, { commit, dispatch })
          }
        }
        resolve(resp)
      }).catch(err => {
        if (axios.isCancel(err)) {
          return
        }
        if (onError) {
          const { dispatchAction, executeFunction, commitAction } = onError
          if (dispatchAction) {
            const { type, payload } = dispatchAction
            dispatch(type, payload)
          }
          if (commitAction) {
            const { type, payload } = commitAction
            commit(type, payload)
          }
          if (executeFunction) {
            executeFunction(err, { commit, dispatch })
          }
        }

        commit(pluginActions.error, { err: err.response, keyPath })
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

const module = {
  state,
  actions,
  mutations
}

export default module
