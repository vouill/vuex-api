import { mapState } from 'vuex'
import pluginActions from './actions'

export const vuexApiCallMixin  = {
  methods: {
    vuexApiCall: function (obj) {
      this.$store.dispatch(pluginActions.request, obj)
    }
  }
}

export const vuexApiGetStateMixin = (keyPath, attrName) =>  ({
  computed: mapState({
    [attrName || 'apiData']: state => state.vuexApi[keyPath],
  })
})
