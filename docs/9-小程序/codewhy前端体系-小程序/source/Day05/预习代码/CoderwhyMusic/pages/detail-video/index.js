// pages/detail-video/index.js
import { getMVDetail, getMVURL, getRelateMV } from '../../service/video'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mvInfo: {},
    mvURL: {},
    relatedMV: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id

    this.getVideoInfo(id)
  },

  getVideoInfo: function(id) {
    // 1.mv detail
    getMVDetail(id).then(res => {
      this.setData({ mvInfo: res.data })
    })

    // 2.mv url
    getMVURL(id).then(res => {
      this.setData({ mvURL: res.data })
    })

    // 3.related mv
    getRelateMV(id).then(res => {
      this.setData({ relatedMV: res.data })
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})