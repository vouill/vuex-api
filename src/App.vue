<template>
  <div id="app">
    <div>
      <github-api  url="repos/vouill/vue-bulma-components/commits" keyPath="vue-bulma-components"/>
      <h2>vuex-api</h2>
      <tree-view :data="repo" :options="{maxDepth: 1}"></tree-view>
      <button @click="clearApiHandlerComponent('vue-bulma-components')">Clear it</button>
    </div>
    <div>
      <github-api url="repos/vouill/vue-geb/commits" keyPath="vue-geb"/>
      <h2>vue-geb</h2>
      <tree-view :data="geb" :options="{maxDepth: 1}"></tree-view>
      <button @click="clearApiHandlerComponent('vue-geb')">Clear it</button>
    </div>
    <div>
      <github-api url="reposdfsdfs/vouill/vue-fdsfsdfsdfsdfsdf/commits" keyPath="vue-fdsfsdfsdfsdfsdf"/>
      <h2>error</h2>
      <tree-view :data="error" :options="{maxDepth: 1}"></tree-view>
    </div>
    <div>
      <json-api :period="5000" :args="{postId: post}" url="comments" keyPath="json"/>
      <h2>json api</h2>
      <button @click="post++">add post nb</button>
      <tree-view :data="json" :options="{maxDepth: 1}"></tree-view>
      <div>Is loading ? {{jsonStatus === 'loading'}}</div>
      <div>response: {{jsonResp}}</div>
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
        post: 1
      })
    },
    methods: {
      clearApiHandlerComponent: function (keyPath) {
        this.$store.dispatch(pluginActions.clear, keyPath)
      }
    },
    computed: mapState({
      repo: getApiState('vue-bulma-components'),
      geb: getApiState('vue-geb'),
      error: getApiState('vue-fdsfsdfsdfsdfsdf'),
      json: getApiState('json'),
      jsonStatus: getApiState('json', ['status']),
      jsonResp: getApiState('json', ['resp'])
    })
}
</script>

