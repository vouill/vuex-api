import get from 'lodash/get'
import { mapState } from 'vuex'
import pluginActions from './actions'

export const vuexApiCallMixin  = {
  methods: {
    vuexApiCall: function (obj) {
      this.$store.dispatch(pluginActions.request, obj)
    },
    vuexApiClear: function (keyPath) {
      this.$store.dispatch(pluginActions.request, keyPath)
    }
  }
}

export const vuexApiGetStateMixin = (keyPath, attrName) =>  ({
  computed: mapState({
    [attrName || 'apiData']: state => get(state.vuexApi,keyPath),
  })
})
