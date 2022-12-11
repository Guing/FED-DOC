### 第四章 Redis 快速入门

------

#### 4-1 redis基本概念+安装方法+基本命令

- 该项目应用redis是要：存储任务信息

- redis安装
- 常用命令redis-cli[进入终端服务]和redis-server[启动redis服务]

#### 4-2 阿里云redis服务配置和远程连接方法讲解

我这里实在腾讯云领了一个月的redis免费试用版本,下面记录为课程的讲解，腾讯云相关redis见读书笔记。

- 购买完数据库后，第一个设置是白名单设置，0.0.0.0/0 如果不设置，会出现远程无法连接的问题
- 创建账号：使用默认账号或创建账号连接
- 连接成功后 `AUTH <password>`

#### 4-3 egg集成redis方法讲解

redis为使用本地

- 首先在npm官网上查看 egg-redis这个插件
- 在server安装：npm i egg-redis  --save
- 根据npm官网上关于egg-redis的代码讲解，分别在plugin.js和config.default.js中添加相关代码。
- 添加一个新路由：/redis/test，并在project的controller中测试
- 添加 await app.redis.get(key)获取key值

```javascript
async getRedis(){
  const { ctx, app } = this;
  const num = await app.redis.get('number')
  console.log(num)
  ctx.body = 'hello redis'
}


//config.defualt.js
 config.redis = {
   client: {
     port: REDIS_PORT,
     host: REDIS_HOST, 
     password:REDIS_PWD,
     db: 0,
   },
   
   //plugin.js
   exports.redis = {
   enable: true,
   package: 'egg-redis',
  };
```

###
