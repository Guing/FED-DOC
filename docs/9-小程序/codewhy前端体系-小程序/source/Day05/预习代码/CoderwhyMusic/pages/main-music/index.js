import eventStore from '../../store/index'
import { getSongMenu, getBannerList } from '../../service/music'

// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendSongs: [],
    hotSongList: [],
    recommendSongList: [],
    audioContext: null,
    topList: {
      0: {},
      2: {},
      3: {}
    }
  },

  recommendHeaderClick() {
    wx.navigateTo({
      url: '/pages/detail-song/index?type=song&idx=1'
    })
  },

  topItemClick(event) {
    const idx = event.target.dataset.idx
    wx.navigateTo({
      url: '/pages/detail-song/index?type=song&idx=' + idx
    })
  },

  handleSearchFocus() {
    wx.navigateTo({
      url: '/pages/song-search/index',
    })
  },

  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    eventStore.setState("playIndex", index)
    eventStore.setState("playList", this.data.recommendSongs)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.发起榜单数据请求
    eventStore.dispatch("getRankingsAction")

    // 2.监听想要的数据
    eventStore.onState("hotRanking", this.hotRankingHanlder)
    eventStore.onState("upRanking", this.getOtherRanking(0).bind(this))
    eventStore.onState("newRanking", this.getOtherRanking(2).bind(this))
    eventStore.onState("originRanking", this.getOtherRanking(3).bind(this))

    // 3.请求热门歌单
    this.getBannerList()
    this.getHotSongsData()
    
    // 3.创建播放对象
    // const audioContext = wx.createInnerAudioContext()
    // audioContext.src = "https://music.163.com/song/media/outer/url?id=167876.mp3"
    // audioContext.autoplay = true
    // this.setData({
    //   audioContext
    // })
  },

  getBannerList() {
    getBannerList().then(res => {
      this.setData({ bannerList: res.banners })
    })
  },
  
  hotRankingHanlder: function(res) {
    const tracks = res.tracks
    if (!tracks) return
    const recommendSongs = tracks.slice(0, 6)
    this.setData({
      recommendSongs
    })
  },

  getOtherRanking: function(idx) {
    return (res) => {
      this.setData({
        topList: { ...this.data.topList, [idx]: res }
      })
    }
  },

  getHotSongsData() {
    getSongMenu().then(res => {
      this.setData({
        hotSongList: res.playlists
      })
    })
    getSongMenu("华语").then(res => {
      this.setData({
        recommendSongList: res.playlists
      })
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    eventStore.offState("hotRanking", this.hotRankingHanlder)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})