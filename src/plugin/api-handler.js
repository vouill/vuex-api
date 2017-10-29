import pluginActions from './actions'
import qs from 'query-string'

export const ApiHandler = (initArgs) => ({
  name: 'api-handled',
  computed: {
    builtUrl: function () {
      return `${this.url}${this.args ? `?${qs.stringify(this.args)}` : ''}`
    }
  },
  props: {
    keyPath: { type: String, required: true },
    url: { type: String, required: true },
    period: Number,
    args: Object,
    persistent: { type: Boolean, default: true }
  },
  methods: {
    apiRequest: function () {
      const { keyPath, builtUrl } = this
      this.$store.dispatch(pluginActions.request, { keyPath, url: builtUrl, ...initArgs })
    }
  },
  watch: {
    builtUrl: function () {
      this.apiRequest()
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
