// 定义代理对象
// const proxyObj = {}
// proxyObj['/ws'] = {
//   ws: true,
//   target: 'ws://localhost:8081'
// }
// // 拦截http请求
// proxyObj['/'] = {
//   ws: false,
//   // 转发到哪里
//   target: 'http://localhost:9090',
//   changeOrigin: true,
//   pathRewrite: {
//     // 这里表示拦截到的地址不改
//     '^/': ''
//   }
// }
// module.exports = {
//   // 开发环境
//   devServer: {
//     host: 'localhost',
//     port: 8080,
//     proxy: proxyObj
//   }
// }
