<template>
  <div id="app">
    <div>
      <api-handler :period="5000" :url="'repos/vouill/vue-bulma-components/commits'" :keyPath="'vue-bulma-components'"/>
      <h2>vue-bulma-components</h2>
      <tree-view :data="repo" :options="{maxDepth: 1}"></tree-view>
      <button @click="clearApiHandler('vue-bulma-components')">Clear it</button>
    </div>
    <div>
      <api-handler :url="'repos/vouill/vue-geb/commits'" :keyPath="'vue-geb'"/>
      <h2>vue-geb</h2>
      <tree-view :data="geb" :options="{maxDepth: 1}"></tree-view>
      <button @click="clearApiHandler('vue-geb')">Clear it</button>
    </div>
    <div>
      <api-handler :url="'reposdfsdfs/vouill/vue-fdsfsdfsdfsdfsdf/commits'" :keyPath="'vue-fdsfsdfsdfsdfsdf'"/>
      <h2>error</h2>
      <tree-view :data="error" :options="{maxDepth: 1}"></tree-view>
    </div>
  </div>
</template>
<style>
  * {
    font-family: 'Roboto', sans-serif;
  }
</style>
<script>
  import { mapState } from 'vuex'
  import pluginActions from 'plugin/actions'
  import { ApiHandler, apiHandlerHelper } from './plugin'

  export default {
    name: 'app',
    components: { ApiHandler },
    methods: {
      clearApiHandler: function (keyPath) {
        this.$store.dispatch(pluginActions.clear, keyPath)
      }
    },
    computed: mapState({
      repo: apiHandlerHelper('vue-bulma-components'),
      geb: apiHandlerHelper('vue-geb'),
      error: apiHandlerHelper('vue-fdsfsdfsdfsdfsdf')
    })
}
</script>

