import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

// hidden 只是一个标记 标记菜单是否渲染
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
