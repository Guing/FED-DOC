// 云函数入口文件
const axios = require("axios")
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const res = await axios.get("http://123.207.32.32:8000/home/multidata")
  return res.data
}