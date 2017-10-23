import Vue from 'vue'
import Vuex from 'vuex'
import vuexApi from './plugin'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    vuexApi
  },
  strict: debug
})
