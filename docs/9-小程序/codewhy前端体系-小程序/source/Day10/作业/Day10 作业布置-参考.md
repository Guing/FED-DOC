# Day10 作业布置

## 一. 完成课堂所有的代码







## 二. 云函数是什么？云函数是如何被运行的？相对于云数据库和云存储有什么优势？

- 云函数即在云端（服务器端）运行的函数
  - 在物理设计上，一个云函数可由多个文件组成，占用一定量的 CPU 内存等计算资源
  - 各云函数完全独立
  - 可分别部署在不同的地区
  - 开发者无需购买、搭建服务器，只需编写函数代码并部署到云端即可在小程序端调用
  - 同时云函数之间也可互相调用
- 一个云函数的写法与一个在本地定义的 JavaScript 方法无异，代码运行在云端 Node.js 中
  - 当云函数被小程序端调用时，定义的代码会被放在 Node.js 运行环境中执行
  - 我们可以如在 Node.js 环境中使用 JavaScript 一样在云函数中进行网络请求等操作
  - 而且我们还可以通过云函数后端 SDK 搭配使用多种服务
  - 比如使用云函数 SDK 中提供的数据库和存储 API 进行数据库和存储的操作
- 云开发的云函数的独特优势在于与微信登录鉴权的无缝整合
  - 当小程序端调用云函数时，云函数的传入参数中会被注入小程序端用户的 openid
  - 开发者无需校验 openid 的正确性因为微信已经完成了这部分鉴权，开发者可以直接使用该 openid





## 三. 云函数有哪些常见的操作？

- 获取openid

  ```js
  const cloud = require('wx-server-sdk')
  exports.main = async () => {
    const { OPENID, APPID, UNIONID} = cloud.getWXContext()
  
    return {
      openid: OPENID,
      appid: APPID,
      unionid: UNIONID,
    }
  }
  ```

  ```js
  async onGetOpenid() {
    const res = await wx.cloud.callFunction({
      name: "getOpenid",
    })
    console.log(res.result);
  }
  ```

- 操作数据库

  ```js
  const cloud = require('wx-server-sdk')
  cloud.init()
  exports.main = async () => {
    const db = cloud.database()
    const _ = db.command
    const collection = db.collection("01test")
  
    const res = await collection.where({
      age: _.gt(3)
    }).get()
  
    return res
  }
  ```

  ```js
  async controlDatabase() {
    const res = await wx.cloud.callFunction({
      name: "controlDatabase"
    })
    console.log(res);
  }
  ```

- 发送网络请求

  - 进入当前的目录，然后在终端安装axios

    ```js
    const axios = require("axios")
    exports.main = async () => {
      const res = await axios.get('http://123.207.32.32:8000/home/multidata')
      return {
        banners: res.data.data.banner.list,
        recommends: res.data.data.recommend.list,
      }
    }
    ```

    ```js
    async onGetHomeData() {
      const res = await wx.cloud.callFunction({
        name: "getHomeData"
      })
      console.log(res.result);
    }
    ```

- 生成小程序码

  ```js
  const cloud = require('wx-server-sdk')
  cloud.init()
  exports.main = async () => {
    const result1 = await cloud.openapi.wxacode.createQRCode({
      path: "page/01database/database",
      with: 430
    })
  
    const extensionName = result1.contentType.split("/").pop()
    const result = await cloud.uploadFile({
      cloudPath: "image/minicode." + extensionName,
      fileContent: result1.buffer
    })
  
    return result
  }
  ```

  ```js
  async onGetQRCode() {
    const res = await wx.cloud.callFunction({
      name: "getQRCode"
    })
    this.setData({ src: res.result.fileID })
  }
  ```

  



## 四. 完成对《音乐小程序》云开发的功能改进，可以尝试添加更多的功能实现







## 五. 选做：完成卡证识别小程序项目







## 六. 自己寻找一些小程序，并说出小程序包含的功能点、技术如何实现(必做)





































































































