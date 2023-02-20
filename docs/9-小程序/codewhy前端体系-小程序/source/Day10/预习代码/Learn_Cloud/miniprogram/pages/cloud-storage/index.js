// pages/cloud-storage/index.js
Page({
  data: {
    localImageURL: ""
  },
  async onUploadFileTap() {
    // 1.从手机上选择一个图片
    const res = await wx.chooseMedia({ mediaType: "image" })
    const filePath = res.tempFiles[0].tempFilePath

    // 2.拼接图片的名称
    const timestamp = new Date().getTime()
    const openid = "coderwhy"
    const extension = filePath.split(".").pop()
    const filename = `${timestamp}_${openid}.${extension}`

    // 3.上传图片
    const result = await wx.cloud.uploadFile({
      filePath,
      cloudPath: "images/" + filename
    })
    console.log(result);
  },
  async onDownloadFileTap() {
    // 1.下载图片
    const res = await wx.cloud.downloadFile({
      fileID: "cloud://coderwhy-i7b7z.636f-coderwhy-i7b7z-1259322030/images/1660754565930_coderwhy.png"
    })

    // 2.显示图片
    this.setData({ localImageURL: res.tempFilePath })
  },
  async onDeleteFileTap() {
    // 删除文件
    const res = await wx.cloud.deleteFile({
      fileList: ["cloud://coderwhy-i7b7z.636f-coderwhy-i7b7z-1259322030/images/1660754565930_coderwhy.png"]
    })
    console.log(res);
  },
  async onGetTempURLTap() {
    const res = await wx.cloud.getTempFileURL({
      fileList: ["cloud://coderwhy-i7b7z.636f-coderwhy-i7b7z-1259322030/1655569536115.jpg"]
    })
    console.log(res);
  }
})