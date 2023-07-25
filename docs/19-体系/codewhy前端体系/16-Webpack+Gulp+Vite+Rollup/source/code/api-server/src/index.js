// koa代码搭建api的服务器
const Koa = require('koa')
const KoaRouter = require('@koa/router')

const app = new Koa()

const userRouter = new KoaRouter({ prefix: '/users' })
userRouter.get("/list", (ctx, next) => {
  console.log(ctx.headers)

  ctx.body = [
    { name: 'why', age: 18, score: 99 },
    { name: 'kobe', age: 30, score: 100 },
    { name: 'james', age: 25, score: 100 }
  ]
})
app.use(userRouter.routes())

app.listen(9000, () => {
  console.log('api服务器启动成功~')
})
