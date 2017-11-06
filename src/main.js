// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import TreeView from 'vue-json-tree-view'
import { ApiHandlerComponent } from './plugin'
Vue.use(TreeView)
Vue.component('github-api', ApiHandlerComponent({ requestConfig: { baseURL: 'https://api.github.com' } }))
Vue.component('json-api', ApiHandlerComponent({ requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' } }))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
