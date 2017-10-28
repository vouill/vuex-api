import pluginActions from './actions'

export const ApiHandler = (args) => ({
  name: 'api-handled',
  props: {
    keyPath: { type: String, required: true },
    url: { type: String, required: true },
    period: Number,
    persistent: { type: Boolean, default: true }
  },
  methods: {
    apiRequest: function () {
      const { keyPath, url } = this
      this.$store.dispatch(pluginActions.request, { keyPath, url, ...args })
    }
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

export default ApiHandler
