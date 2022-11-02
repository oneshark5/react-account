const jsonServer = require('json-server')
// 引入express
const express = require('express')
const path = require('path')
const { request } = require('http')
// 调用jsonServer下的方法create创建一个服务器
const server = jsonServer.create()
const router = jsonServer.router('db.json')
// 定义LeanCloud端口号---当我们上传server以后，在该环境变量下设定一个端口供我们使用
const port = process.env.LEANCLOUD_APP_PORT || 3000
// 添加jsonServer中间件
const middlewares = jsonServer.defaults()
const root = __dirname + '/build'
// 设置过期时间
server.use(express.static(root, {maxAge:8640000}))
server.use(middlewares)
// 当路由是create或者edit时不用json-server管理，跳转到首页index.html中去
const reactRouterWhiteList = ['/create', '/edit/:itemId']
server.get(reactRouterWhiteList, (request, response) => {
  response.sendFile(path.resolve(root, 'index.html'))
})
server.use(router)
server.listen(port, () => {
  console.log('server is runing. id is 3000');
})