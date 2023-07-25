const Koa = require('koa')
const KoaRouter = require('@koa/router')
const static = require('koa-static')

const app = new Koa()

app.use(static('./client'))

// 中间件
// app.use(async (ctx, next) => {
//   // 1.允许简单请求开启CORS
//   ctx.set("Access-Control-Allow-Origin", "*")
//   // 2.非简单请求开启下面的设置
//   ctx.set("Access-Control-Allow-Headers", "Accept, AcceptEncoding, Connection, Host, Origin")
//   ctx.set("Access-Control-Allow-Credentials", true) // cookie
//   ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
//   // 3.发起的是一个options请求
//   if (ctx.method === 'OPTIONS') {
//     ctx.status = 204
//   } else {
//     await next()
//   }
// })

const userRouter = new KoaRouter({ prefix: '/users' })
userRouter.get('/list', (ctx, next) => {
  ctx.body = [
    { id: 111, name: "why", age: 18 },
    { id: 112, name: "kobe", age: 18 },
    { id: 113, name: "james", age: 25 },
    { id: 114, name: "curry", age: 30 },
  ]
})
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(8000, () => {
  console.log('koa服务器启动成功~')
})
