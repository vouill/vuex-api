import get from 'lodash/get'

export const getApiState = (keyPath, path = []) => state => get(state, ['vuexApi', keyPath, ...path])
export const getApiData = (keyPath, path = []) => state => get(state, ['vuexApi', keyPath, 'data', ...path])
