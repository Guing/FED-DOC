// pages/main-video/main-video.js
import { getTopMV } from "../../services/video"

Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },

  onLoad() {
    // 发送网络请求
    this.fetchTopMV()
  },

  // =================  发送网络请求的方法 =================  
  async fetchTopMV() {
    // getTopMV().then(res => {
    //   this.setData({ videoList: res.data })
    // })
    // 1.获取数据
    const res = await getTopMV(this.data.offset)

    // 2.将新的数据追加到原来数据的后面
    const newVideoList = [...this.data.videoList, ...res.data]

    // 3.设置全新的数据
    this.setData({ videoList: newVideoList })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },

  // =================  监听上拉和下拉功能  =================  
  onReachBottom() {
    // 1.判断是否有更多的数据
    if (!this.data.hasMore) return

    // 2.如果有更多的数据, 再请求新的数据
    this.fetchTopMV()
  },
  async onPullDownRefresh() {
    // 1.清空之前的数据
    this.setData({ videoList: [] })
    this.data.offset = 0
    this.data.hasMore = true

    // 2.重新请求新的数据
    await this.fetchTopMV()

    // 3.停止下拉刷新
    wx.stopPullDownRefresh()
  },

  // =================  界面事件监听的方法 =================  
  onVideoItemTap(event) {
    // const item = event.currentTarget.dataset.item
    // wx.navigateTo({
    //   url: `/pages/detail-video/detail-video?id=${item.id}`,
    // })
  }
})