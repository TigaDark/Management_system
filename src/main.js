import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import Qs from 'qs'
import store from './store/index'
import { initMenu } from './utils/menu'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:9090/'
Vue.prototype.$qs = Qs
axios.defaults.withCredentials = true // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    if (window.sessionStorage.getItem('user')) {
      // 初始化目录 这里初始化是为了防止用户F5 刷新Vuex
      initMenu(router, store)
      return next()
    } else {
      console.log(3)
      // 没登录不应该跳转login？
      return next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
