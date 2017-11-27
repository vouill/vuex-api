import pluginActions from './actions'

export const ApiHandlerComponent = (initArgs) => ({
  name: 'api-handled',
  props: {
    keyPath: { type: String, required: true },
    url: { type: String, required: true },
    period: Number,
    params: Object,
    persistent: { type: Boolean, default: true }
  },
  methods: {
    apiRequest: function () {
      const { keyPath, url, params } = this
      this.$store.dispatch(pluginActions.request, { keyPath, url, params, ...initArgs })
    }
  },
  watch: {
    // params: function () {
    //   this.apiRequest()
    // },
    // url: function () {
    //   this.apiRequest()
    // }
  },
  created: function () {
    this.apiRequest()
    if (this.period) {
      this.intervalId = setInterval(this.apiRequest, this.period)
    }
  },
  destroyed: function () {
    if (!this.persistent) {
      this.$store.dispatch(pluginActions.clear, this.keyPath)
    }
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  render () {
    return null
  }
})

export default ApiHandlerComponent
