import get from 'lodash/get'

export const getApiState = (keyPath, path = [], dflt) => state => get(state, ['vuexApi', keyPath, ...path], dflt)
export const getApiResp = (keyPath, path = [], dflt) => state => get(state, ['vuexApi', keyPath, 'resp', ...path], dflt)
export const getApiData = (keyPath, path = [], dflt) => state => get(state, ['vuexApi', keyPath, 'resp', 'data', ...path], dflt)
export const getApiStatus = (keyPath, path = [], dflt) => state => get(state, ['vuexApi', keyPath, 'status', ...path], dflt)
