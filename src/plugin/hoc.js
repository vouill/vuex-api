/* eslint-disable no-console */
import TreeView from 'vue-json-tree-view/src/TreeView.vue';
import get from 'lodash/get'
import { mapState } from 'vuex'
import { getApiState } from './index'

export const wrapper = (child, { keyPath, propName }) => {
  if(!keyPath){
    console.warn('Invalid Keypath passed to HOC: ', keyPath)
  }
  const usedPropName = propName || 'data'
  return ({
    name: 'wrapper',
    computed: mapState({
      [usedPropName]: getApiState(keyPath),
    }),
    render: function (h) {
      return h(child, { props: { [usedPropName]: this[usedPropName] } })
    },
  })
}


export default {
    name: 'hoc',
    props: { propName: { type: String, default: () => 'data' }, keyPath: Array },
    computed: mapState({
      data(state) { return get(state, ['vuexApi', this.keyPath])}
    }),
    render: function (h) {
      console.log(this.$slots.default[0])
      console.log(this.data)
      const children = this.$slots.default[0]
        children.componentOptions.propsData.data = this.data
      return children
    },
  }

export const Debug = {
    name: 'vuex api debug',
    props: ['keyPath'],
    computed: mapState({
      data (state) { return get(state, ['vuexApi', this.keyPath])},
    }),
    render: function (h) {
      return h(TreeView, { props: { data: this.data, options:{ maxDepth: 2, rootObjectKey: this.keyPath } } })
    },
  }
