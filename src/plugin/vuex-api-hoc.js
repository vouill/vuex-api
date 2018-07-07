/* eslint-disable no-console */

export const ApiHandlerComponent = {
  name: 'vuex-helper',
  props: {
    keyPath: { type: String, required: true },
    loadingComponent: Object,
  },
  computed: {
    storeObject () {
      return this.$store.state.vuexApi[this.keyPath]
    },
  },
  render (h) {
    if(!this.storeObject){
      return null
    }
    if(this.storeObject.status === 'loading'){
      this.$slots.loading[0].componentOptions.propsData.storeObject = this.storeObject
      return h('div', this.$slots.loading)
    }
    if(this.storeObject.status === 'success' && this.$slots.success){
      this.$slots.success[0].componentOptions.propsData.storeObject = this.storeObject
      this.$slots.success[0].componentOptions.propsData.vuexApiData = this.storeObject.resp.data
      return h('div', this.$slots.success)
    }
    if(this.storeObject.status === 'error'){
      this.$slots.error[0].componentOptions.propsData.storeObject = this.storeObject
      this.$slots.error[0].componentOptions.propsData.vuexApiError = this.storeObject.resp.err
      return h('div', this.$slots.error)
    }
    return null
  }
}

export default ApiHandlerComponent
