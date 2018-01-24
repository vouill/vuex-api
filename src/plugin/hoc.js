/* eslint-disable no-console */
import get from 'lodash/get'
import { mapState } from 'vuex'
import { getApiState } from './index'

export default (child, { keyPath, propName }) => {
  if(!keyPath){
    console.warn('Invalid Keypath passed to HOC: ', keyPath)
  }
  const usedPropName = propName || 'data'
  return ({
    name: 'hoc',
    computed: mapState({
      [usedPropName]: getApiState(keyPath),
    }),
    render: function (h) {
      return h(child, { props: { [usedPropName]: this[usedPropName] } })
    },
  })
}

export const Debug = {
    name: 'vuex api debug',
    props: ['keyPath'],
    computed: mapState({
      data (state) { return get(state, ['vuexApi', this.keyPath])},
    }),
    render: function (h) {
      // return h('code', this.data && JSON.stringify(this.data), null, 4)
      return h('pre', null, [h('code',this.data && JSON.stringify(this.data, null, 4))])
    },
  }
