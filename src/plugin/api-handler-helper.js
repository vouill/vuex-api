import get from 'lodash/get'

export const apiHandlerHelper = keyPath => state => get(state, ['vuexApi', keyPath])
