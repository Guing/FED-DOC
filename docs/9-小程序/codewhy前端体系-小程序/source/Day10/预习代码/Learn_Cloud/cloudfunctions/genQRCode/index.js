// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const result1 = await cloud.openapi.wxacode.createQRCode({
    "path": 'page/cloud-database/index',
    "width": 430
  })

  const extensionName = result1.contentType.split("/").pop()
  const result = await cloud.uploadFile({
    cloudPath: "images/minicode." + extensionName,
    fileContent: result1.buffer
  })

  return result
}