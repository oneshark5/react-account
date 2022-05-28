// // const { createProxyMiddleware } = require('http-proxy-middleware');
// // module.exports = function(app) {
// //   app.use(
// //     // 过滤拼接
// //     '/items', //请求的路径，以api开头的都是开始路径 /api/center--查找target拼接的接口
// //     createProxyMiddleware({
// //       target: 'http://localhost:3004',//要访问的地址，用以匹配拼接的头部
// //       changeOrigin: true,
// //       pathRewrite: {"^/items": "/"},//重写请求路径
// //     })
// //   );
// // };

// //verion > 1.0
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {

//   app.use('/items', createProxyMiddleware({
//     target: 'http://localhost:3004',
//     changeOrigin: true,
//   }));

//   app.use('/api2', createProxyMiddleware({
//     target: 'http://xxx.com',
//     changeOrigin: true,
//     pathRewrite: { //路径替换
//       '^/api2': '/api', // axios 访问/api2 == target + /api
//  }
//   }));

// };
// //注意一般安装的版本都是大于1的,所以可以直接选择  >1的解决方法