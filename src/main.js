import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import Qs from 'qs'
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:9090/'
Vue.prototype.$qs = Qs
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
