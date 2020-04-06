import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:
    {
      routes: []
    },
  mutations:
    {
      // 传一个data数据就可以了 不要多传
      initRoutes (state, data) {
        state.routes = data
      }
    },
  actions:
    {}

})
export default store
