<template>
  <div id="app">
    <div>
      <github-api :period="5000" url="repos/vouill/vue-bulma-components/commits" keyPath="vue-bulma-components"/>
      <h2>vuex-api</h2>
      <tree-view :data="repo" :options="{maxDepth: 1}"></tree-view>
      <button @click="clearApiHandler('vue-bulma-components')">Clear it</button>
    </div>
    <div>
      <github-api url="repos/vouill/vue-geb/commits" keyPath="vue-geb"/>
      <h2>vue-geb</h2>
      <tree-view :data="geb" :options="{maxDepth: 1}"></tree-view>
      <button @click="clearApiHandler('vue-geb')">Clear it</button>
    </div>
    <div>
      <github-api url="reposdfsdfs/vouill/vue-fdsfsdfsdfsdfsdf/commits" keyPath="vue-fdsfsdfsdfsdfsdf"/>
      <h2>error</h2>
      <tree-view :data="error" :options="{maxDepth: 1}"></tree-view>
    </div>
    <div>
      <json-api :args="{postId: post}" url="comments" keyPath="json"/>
      <h2>json api</h2>
      <button @click="post++">add post nb</button>
      <tree-view :data="json" :options="{maxDepth: 1}"></tree-view>
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
  import { getApiState } from './plugin'

  export default {
    name: 'app',
    data: function () {
      return ({
        post: 0
      })
    },
    methods: {
      clearApiHandler: function (keyPath) {
        this.$store.dispatch(pluginActions.clear, keyPath)
      }
    },
    computed: mapState({
      repo: getApiState('vue-bulma-components'),
      geb: getApiState('vue-geb'),
      error: getApiState('vue-fdsfsdfsdfsdfsdf'),
      json: getApiState('json')
    })
}
</script>

