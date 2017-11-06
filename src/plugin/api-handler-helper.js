import get from 'lodash/get'

export const getApiState = (keyPath, path = [], dflt) => state => get(state, ['vuexApi', keyPath, ...path], dflt)
export const getApiData = (keyPath, path = [], dflt) => state => get(state, ['vuexApi', keyPath, 'data', ...path], dflt)
