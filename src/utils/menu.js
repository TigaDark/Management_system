import axios from 'axios'

// 发起请求 获取菜单项 并添加到路由里面 和 Vuex里面
export const initMenu = async (router, store) => {
  // 有菜单数据 直接返回即可
  if (store.state.routes.length > 0) {
    return
  }
  const { data: res } = await axios.get('/system/config/menu')
  console.log(res)
  if (res) {
    const fmtRoutes = formatRoutes(res)
    // 将格式化后的 菜单 添加到Routes里面
    router.addRoutes(fmtRoutes)
    // 添加到Vuex里面  第一个参数是方法名字 第二个是数据
    store.commit('initRoutes', fmtRoutes)
  }
}

export const formatRoutes = (routes) => {
  const fmRoutes = []
  // 批量定义
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router
    // 如果是一级菜单递归调用 二级菜单
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }
    // 定义Component 路由
    const fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children,
      component (resolve) {
        // 根据component的名字前缀 确认component 放的位置
        if (component.startsWith('Home')) {
          require(['../components/' + component + '.vue'], resolve)
        } else if (component.startsWith('Emp')) {
          require(['../components/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith('Per')) {
          require(['../components/per/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sal')) {
          require(['../components/sal/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sta')) {
          require(['../components/sta/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sys')) {
          require(['../components/sys/' + component + '.vue'], resolve)
        }
      }
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes
}
