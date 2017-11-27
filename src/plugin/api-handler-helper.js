import get from 'lodash/get'

export const getApiState = (keyPath, path = [], defaultValue) => state => get(state, ['vuexApi', keyPath, ...path], defaultValue)
export const getApiResp = (keyPath, path = [], defaultValue) => state => get(state, ['vuexApi', keyPath, 'resp', ...path], defaultValue)
export const getApiData = (keyPath, path = [], defaultValue) => state => get(state, ['vuexApi', keyPath, 'resp', 'data', ...path], defaultValue)
export const getApiStatus = (keyPath, path = [], defaultValue) => state => get(state, ['vuexApi', keyPath, 'status', ...path], defaultValue)
