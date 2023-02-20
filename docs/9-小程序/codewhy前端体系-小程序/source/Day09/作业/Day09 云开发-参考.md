# Day09 作业布置

## 一. 完成课堂所有的代码







## 二. 什么是云开发？和传统的开发模式有什么区别？

云开发:

- 一种新的开发模式 使得开发者更加专注于业务逻辑

- 个人的项目 不想开发服务器 使用云开发 个人的毕业设计

和传统的开发模式有什么区别

- 云开发包含云数据库 云存储 云函数 传统开发模式 包含数据库 对象存储 弹性伸缩 负载均衡 日志服务 安全服务 ...
- 项目流程 
  - 传统开发 需要进行部署 前后端接口对接 测试 上线 
  - 云开发 只需要进行设计 开发 测试



## 三. 云开发如何初始化？默认初始化做了什么？

- 进行目录结构的配置 在 app.json中 默认已经完成

- 使用 wx.cloud.init方法完成云能力初始化包含两个参数

- env 默认环境配置
- traceUser 是否将用户访问记录到用户管理中





## 四. 总结云数据库的增删改查操作

- 增

```js
// 1 获取数据库
const db = wx.cloud.database();
// 2 获取到操作的集合
const studentsColl = db.collection("students");

// 添加
studentsColl
      .add({
        data: {
          name: "wmm",
          age: 18,
          height: 1.88,
          address: {
            name: "sx",
            code: "033000",
          },
          hobbies: ["联盟", "吃鸡"],
        },
      })
```

删

```js
 // 删除数据
     studentsColl
     .doc("6d85a2b962fefabe1a635e252c570b60")
       .remove()
       .then((res) => {
         console.log(res);
       });

// 根据条件删除
 const _ = db.command;
    studentsColl
      .where({
        age: _.gt(25),
      })
      .remove()
      .then((res) => {
        console.log(res);
      });
```

改

```js
 // 修改 某一条数据
    studentsColl
      .doc("0a4ec1f962ff32731a5056974fac5b24")
      .update({
        data: {
          hobbies: ["c", "t", "lq"],
          age: 30,
        },
      })
      .then((res) => {
        console.log(res);
      });
// 2 set 新增 将原来的字段全部替换掉
studentsColl
     .doc("8f75309d62ff32721546b5852c0431e6")
      .set({
        data: {
          age: 31,
        },
      })
      .then((res) => {
        console.log(res);
      });
  // update 更新多条数据
const _ = db.command;
    studentsColl
      .where({
        age: _.gt(25),
      })
      .update({
        data: { age: 10 },
      })
      .then((res) => {
        console.log(res);
      });
```

查

```js
    // 1 方式一 根据id查询某条数据
   lolColl
      .doc("b69f67c062ff0a6311e0f21f02fd1047")
      .get()
      .then((res) => {
        console.log(res);
    	});
    // 2 方式二 查询多条数据
 lolColl
      .where({
        nickname: "天才辅助杨小杨",
      })
      .get()
      .then((res) => {
        console.log(res);
      });
// 3 方式三 查询指令, gt/lt
   const _ = db.command;
    lolColl
      .where({
        rid: _.gte(5000000),
      })
      .get()
      .then((res) => {
        console.log(res);
      });

    // 4 正则表达式
 lolColl
      .where({
        nickname: db.RegExp({
          regexp: "z",
          options: "i",
        }),
      })
      .get()
      .then((res) => {
        console.log(res);
      });

    // 5 方式五 获取整个集合中的数据
  lolColl.get().then((res) => {
      console.log(res);
    });
 // 6 分页 skip(offset)/ limit
 let page = 1;
    lolColl
      .skip(page * 5)
      .limit(5)
      .get()
      .then((res) => {
        console.log(res);
      });
 // 7 排序 orderBy("rid")
// 升序 asc
    // 降序 desc
    lolColl
      .skip(page * 5)
      .limit(5)
      .orderBy("rid", "asc")
      .get()
      .then((res) => {
        console.log(res);
    	});
  // 8 过滤字段
 lolColl
      .field({
        _id: true,
        hn: true,
        nickname: true,
        roomName: true,
        rid: true,
      })
      .skip(page * 5)
      .limit(5)
      .orderBy("rid", "desc")
      .get()
      .then((res) => {
        console.log(res);
      });

```





## 五. 什么是查询指令？查询指令有什么作用？

什么是查询指令

- 如果我们需要查询某一类别的数据 比如年龄>30 的 
- 那么传统的查询语句就无法满足了 数据库就提供了多种查询指令 在 db.command对象上





## 六. 总结云存储的上传、下载、删除文件

上传

```js
    const imageRes = await wx.chooseMedia({
      type: "image",
    });

    // 2 获取照片
    const imagePath = imageRes.tempFiles[0].tempFilePath;
    // 动态生成图片名称
    const timestamp = Date.now();
    const openid = "open_xx";
    const extension = imagePath.split(".").pop();
    const filename = `${timestamp}_${openid}_${extension}`;
    const uploadRes = await wx.cloud.uploadFile({
      filePath: imagePath,
      cloudPath: `images/${filename}`,
    });
```

下载

```js
 const result = await wx.cloud.downloadFile({
      fileID:
        "	cloud://cloud1-0gs04p81a1eb23de.636c-cloud1-0gs04p81a1eb23de-1313399766/images/1660901337462_open_xx_png",
    });
    this.setData({
      tempFilePath: result.tempFilePath,
    });
```

删除

```js
const res = await wx.cloud.deleteFile({
      fileList: [
        "cloud://cloud1-0gs04p81a1eb23de.636c-cloud1-0gs04p81a1eb23de-1313399766/21.png",
      ],
    });
```

生成临时文件

```js
 const res = await wx.cloud.getTempFileURL({
      fileList: [
        "cloud://cloud1-0gs04p81a1eb23de.636c-cloud1-0gs04p81a1eb23de-1313399766/1.png",
        "cloud://cloud1-0gs04p81a1eb23de.636c-cloud1-0gs04p81a1eb23de-1313399766/emojimix_🦄_🌇.png",
      ],
    });
```



# 明天讲

## 七. 云函数是什么？云函数是如何被运行的？相对于云数据库和云存储有什么优势？

云函数是什么

- 是在服务器上运行的函数





## 八. 云函数有哪些常见的操作？


