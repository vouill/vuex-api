<template>
  <div id="app">
    <div>
      <github-api  url="repos/vouill/vue-bulma-components/commits" keyPath="vue-bulma-components"/>
      <h2>vuex-api</h2>
      <tree-view :data="repo" :options="{maxDepth: 1}"></tree-view>
      <button @click="clearApiHandlerComponent('vue-bulma-components')">Clear it</button>
    </div>
    <div>
      <github-api url="reposdfsdfs/vouill/vue-fdsfsdfsdfsdfsdf/commits" keyPath="vue-fdsfsdfsdfsdfsdf"/>
      <h2>error</h2>
      <tree-view :data="error" :options="{maxDepth: 1}"></tree-view>
    </div>
    <div>
      <json-api :args="{postId: post}" url="posts" keyPath="json"/>
      <h2>json api</h2>
      <button @click="post++">add post nb</button>
      <tree-view :data="json" :options="{maxDepth: 1}"></tree-view>
    </div>

    <div>
      <h2>json api Post</h2>
      <tree-view :data="postPost" :options="{maxDepth: 1}"></tree-view>
      <button @click="sendPostReq">Post request</button>
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
      },
      sendPostReq: function () {
        this.$store.dispatch(pluginActions.request, {
          requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' },
          method: 'POST',
          url: 'posts',
          data: { title: 'foo', userId: 2, body: 'bar' },
          keyPath: ['postPost']
        })
      }
    },
    computed: mapState({
      repo: getApiState('vue-bulma-components'),
      geb: getApiState('vue-geb'),
      error: getApiState('vue-fdsfsdfsdfsdfsdf'),
      json: getApiState('json'),
      jsonStatus: getApiState('json', ['status']),
      jsonResp: getApiState('json', ['resp']),
      postPost: getApiState('postPost')
    })
}
</script>

