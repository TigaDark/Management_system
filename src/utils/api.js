import axios from 'axios'
import { Message } from 'element-ui'
// 这里用message 和 axios 进行错误提示控制封装

axios.interceptors.response.use(success => {
  // 这里success.status是http请求响应的 状态码
  // success.data 才是你返回的数据
  // success.data.status 是你返回数据里面的状态码
  // 这里的返回是 你vue请求调用后返回的东西 被拦截然后 看看是否放行
  // http status=200 表示响应成功 但是如果你返回的是500 表示你请求错了 什么都不返回并提示
  // 如果成功就直接返回数据 所以能够直接拿到数据
  if (success.status && success.status === 200 && success.data.status === 500) {
    Message.error(success.data.msg)
    return null
  }
  // 提示框 成功返回的信息
  if (success.data.msg) {
    Message.success(success.data.msg)
  }
  return success.data
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
// const base = ''
// 这里可以封装请求 但是其实没必要 别忘记security登录 用key：value 不是json

// export const postKeyValueRequest = (url, params) => {
//   return axios({
//     method: 'post',
//     url: `${base}${url}`,
//     data: params,
//     transformRequest: [function (data) {
//       let ret = ''
//       for (const i in data) {
//         ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
//       }
//       return ret
//     }],
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }
//
// export const postRequest = (url, params) => {
//   return axios({
//     method: 'post',
//     url: `${base}${url}`,
//     data: params
//   })
// }
// export const putRequest = (url, params) => {
//   return axios({
//     method: 'put',
//     url: `${base}${url}`,
//     data: params
//   })
// }
// export const getRequest = (url, params) => {
//   return axios({
//     method: 'get',
//     url: `${base}${url}`,
//     data: params
//   })
// }
// export const deleteRequest = (url, params) => {
//   return axios({
//     method: 'delete',
//     url: `${base}${url}`,
//     data: params
//   })
// }
