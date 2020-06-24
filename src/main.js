import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import Qs from 'qs'
import store from './store/index'
import { initMenu } from './utils/menu'
import 'font-awesome/css/font-awesome.min.css'
import { Message } from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:9090/'
Vue.prototype.$qs = Qs
axios.defaults.withCredentials = true // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息

// 这里用message 和 axios 进行错误提示控制封装
axios.interceptors.response.use(success => {
  // 这里success.status是http请求响应的 状态码
  // success.data 才是你返回的数据
  // success.data.status 是你返回数据里面的状态码
  // 这里的返回是 你vue请求调用后返回的东西 被拦截然后 看看是否放行
  // http status=200 表示响应成功 但是如果你返回的是500 表示你请求错了 什么都不返回并提示
  // 如果成功就直接返回数据 所以能够直接拿到数据
  console.log('sucess' + success.data.status)
  if (success.status && success.status === 200 && success.data.status === 500) {
    Message.error(success.data.msg)
    return null
  }
  // 提示框 成功返回的信息
  if (success.data.msg) {
    Message.success(success.data.msg)
  }
  return success
}, error => {
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error('服务器请求失败，被吃了，( ╯□╰ )')
  } else if (error.response.status === 403) {
    Message.error('权限不足，请联系管理员')
  } else if (error.response.status === 401) {
    Message.error('尚未登录.请登录')
  } else {
    if (error.response.data.msg) {
      Message.error(error.response.data.msg)
    } else {
      Message.error('未知错误!')
    }
  }
  return null
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    if (window.sessionStorage.getItem('user')) {
      // 初始化目录 这里初始化是为了防止用户F5 刷新Vuex
      initMenu(router, store)
      return next()
    } else {
      Message.error('尚未登录,你无权访问,请登录')
      // 没登录应该跳转login 而且登录后就跳转到你想去的界面
      return next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
