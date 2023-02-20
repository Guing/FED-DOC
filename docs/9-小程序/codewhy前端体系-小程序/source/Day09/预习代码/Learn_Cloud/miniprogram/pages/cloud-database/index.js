// pages/cloud-database/index.js
const db = wx.cloud.database()
const collection = db.collection("users")

Page({
  onInsertDataTap() {
    // 1.获取数据库和集合
    const db = wx.cloud.database()
    const collection = db.collection("users")

    // 2.在数据库中添加数据
    collection.add({
      data: {
        name: "kobe",
        age: 30,
        hobbies: ["篮球", "足球"],
        address: {
          "city": "洛杉矶",
          "postcode": 11111
        }
      },
      success: (res) => {
        console.log(res);
      }
    })
  },
  onDeleteDataTap() {
    collection.doc("058dfefe62fcff411588020820f07714").remove({
      success: (res) => {
        console.log("删除成功:", res);
      }
    })
  },
  onUpdateDataTap() {
    const db = wx.cloud.database()
    const collection = db.collection("users")

    // 更新某一个字段
    collection.doc("0ab5303b62fcfbff1706c2a95de555b3").update({
      data: {
        age: 20,
        hobbies: ["篮球", "乒乓球"]
      }
    })
    // 替换正条数据
    collection.doc("058dfefe62fcff411588020820f07714").set({
      data: {
        name: "james",
        age: 25
      }
    })
  },
  onSelectDataTap() {
    const collection = db.collection("wzry")

    // 1.精准查询
    collection.doc("6a6a269a62fd0d00029351665d32187a")
      .get().then(res => {
        console.log(res.data);
      });

    // 2.根据条件查询
    collection.where({
      nickname: "MrGemini"
    }).get().then(res => {
      console.log(res.data);
    })

    // 3.根据查询指令
    const _ = db.command
    collection.where({
      rid: _.gt(5094760)
    }).get().then(res => {
      console.log(res);
    })

    // 4.正则表达式查询
    collection.where({
      nickname: db.RegExp({
        regexp: "x",
        options: "i"
      })
    }).get().then(res => {
      console.log(res);
    })

    // 5.获取整个集合
    collection.get().then(res => {
      console.log(res);
    })

    // 6.综合查询
    collection.field({
      nickname: true,
      roomName: true,
      rid: true
    }).skip(2).limit(3).orderBy("rid", "asc")
    .get().then(res => {
      console.log(res);
    })
  },
})