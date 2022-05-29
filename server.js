const jsonServer = require('json-server')
// 引入express
const express = require('express')
const path = require('path')
const { request } = require('http')
// 调用jsonServer下的方法create创建一个服务器
const server = jsonServer.create()
const router = jsonServer.router('db.json')
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
server.listen(3000, () => {
  console.log('server is runing. id is 3000');
})