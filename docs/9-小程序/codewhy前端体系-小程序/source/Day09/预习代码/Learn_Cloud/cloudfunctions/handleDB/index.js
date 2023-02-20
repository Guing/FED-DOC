// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const db = cloud.database()
  const collection = db.collection("users")

  const _ = db.command
  const res = await collection.where({
    age: _.gt(10)
  }).remove()

  return res
}