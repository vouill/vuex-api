import pluginActions from 'plugin/actions'

export const ApiHandler = {
  name: 'api-handled',
  props: { keyPath: String, url: String, period: Number },
  methods: {
    apiRequest: function () {
      this.$store.dispatch(pluginActions.request, { keyPath: this.keyPath, url: this.url })
    }
  },
  created: function () {
    this.apiRequest()
    if (this.period) {
      this.intervalId = setInterval(this.apiRequest, this.period)
    }
  },
  destroyed: function () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  render () {
    return null
  }
}
