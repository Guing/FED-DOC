#  egg.js+云mongodb快速入门

# egg.js

官网：https://eggjs.org/zh-cn/

- egg基于koa2生成的一个企业级框架。

## 初始化

初始化和项目启动方法

```javascript
# 初始化
$ mkdir egg-example && cd egg-example
$ npm init egg --type=simple
$ npm i
# 项目启动
$ npm run dev
$ open http://localhost:7001
```

这里需要注意的一点是：npm init egg 实际执行的是 create-egg这个包。

## 通过egg.js框架添加新的API

本节主要多egg脚手架进行了简单演示，将原路由home以及文件删除，新建了project/template路由以及controller。 路由在app/router.js中

```javascript
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/project/template', controller.project.getTemplate);
};
```

controller of project

```javascript
'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async getTemplate() {
    const { ctx } = this;
    ctx.body = 'get template';
  }
}

module.exports = ProjectController;
```

# 云mongodb开通+本地mongodb调试技巧讲解

## 云mongodb开通

地址: https://mongodb.console.aliyun.com/

## 本地mongodb安装

本地安装mongodb：https://www.runoob.com/mongodb/mongodb-osx-install.html

此处为语雀内容卡片，点击链接查看：https://www.yuque.com/go/doc/31271217

# egg.js接入mongodb方法

本地mongodb数据库创建完成后，开始连接我们的本地数据库。

回到上节新创建的项目,sam老师安装的第三方依赖为

- app下新建utils/mongo.js
- npm i -S @pick-star/cli-mongodb

由于@pick-star/cli-mongodb代码较少，我这里选择不安装，本地敲一遍代码：

- cnpm i -S npmlog mpngodb
- 在utils目录下新建log.js

```javascript
'use strict'

const npmlog = require('npmlog')
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.headingStyle = { fg: 'red', bg: 'white' };
log.heading = 'liugezhou';
log.addLevel('success', 2500, { fg: 'green' });

module.exports = log;
```

- 在utils目录下新建mongodb.js(@pick-star/cli-mongodb源码)

```javascript
'use strict';

const MongoClient = require('mongodb').MongoClient;
const logger = require('./log');

class Mongo {
  constructor(url) {
    this.url = url;
  }

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        this.url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err, client) => {
          if (err) {
            reject(err);
          } else {
            const db = client.db();
            resolve({ db, client });
          }
        });
    });
  }

  connectAction(docName, action) {
    return new Promise(async (resolve, reject) => {
      const { db, client } = await this.connect();
      try {
        const collection = db.collection(docName);
        action(collection, result => {
          this.close(client);
          logger.verbose('result', result);
          resolve(result);
        }, err => {
          this.close(client);
          logger.error(err.toString());
          reject(err);
        });
      } catch (err) {
        this.close(client);
        logger.error(err.toString());
        reject(err);
      }
    });
  }

  query(docName) {
    return this.connectAction(docName, (collection, onSuccess, onError) => {
      collection.find({}, { projection: { _id: 0 } }).toArray((err, docs) => {
        if (err) {
          onError(err);
        } else {
          onSuccess(docs);
        }
      });
    });
  }

  insert(docName, data) {
    return this.connectAction(docName, (collection, onSuccess, onError) => {
      collection.insertMany(data, (err, result) => {
        if (err) {
          onError(err);
        } else {
          onSuccess(result);
        }
      });
    });
  }

  remove(docName, data) {
    return this.connectAction(docName, (collection, onSuccess, onError) => {
      collection.deleteOne(data, (err, result) => {
        if (err) {
          onError(err);
        } else {
          onSuccess(result);
        }
      });
    });
  }

  update() {

  }

  close(client) {
    client && client.close();
  }
}

module.exports = Mongo;
```

utils/mongo.js 代码修改：

```javascript
'use strict';

const Mongodb = require('./mongodb');
const { mongoDbName } = require('../../config/db');

function mongo() {
  return new Mongodb(mongodbUrl);
}

module.exports = mongo;
```

接着，在mongo.js暴露出去

```javascript
'use stirct'

const Mongodb = require('./mongodb')
const { mongoDbUrl,mongodbName} = require('../../config/db') // 配置这两个参数

function mongo(){
    return new Mongodb(mongoDbUrl,mongodbName)
}

// config/db.js
'use strict';

// Mondodb
const mongodbUrl = `mongodb://${user}:${pass}@liugezhou.com:27017/${database}`;

module.exports = {
  mongodbUrl,
};
```

最后，在Controller的project中访问：

```javascript
const mongo = require('./mongo.js')
 async getTemplate(){
      const { ctx } = this;
    const data = await mongo().query('project');
    ctx.body = data;
 }
```

![img](image/1624587734742-102c0161-8d65-4fb6-bd8d-a95f2902e7d2.png)



若有收获，就点个赞吧