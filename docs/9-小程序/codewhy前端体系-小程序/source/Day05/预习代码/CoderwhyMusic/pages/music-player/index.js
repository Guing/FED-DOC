// pages/music-player/index.js
import { getPlayerLyric, getPlayerMusic } from '../../service/player'
import { parseLyric } from '../../utils/lyric-parse'

import eventStore from '../../store/index'

const modeNames = ["order", "random", "repeat"]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: 20,
    contentHeight: 0,
    currentPage: 0,
    isShowPlayList: false,
    hasLyric: true,

    currentSong: {},
    lyricList: [],
    
    audioContext: null,
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isChanging: false,
    isPlaying: true,

    currentLyricIndex: 0,
    currentLyricContent: "",
    lyricScrollTop: 0,

    // 临时测试数据
    playList: [],
    playIndex: 0,
    playMode: 0,
    modeName: "order"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id

    // 获取状态栏高度
    const info = wx.getSystemInfoSync()
    console.log(info)
    if (info.windowHeight < 750) {
      this.setData({ hasLyric: false })
    }
    this.setData({ statusHeight: info.statusBarHeight })
    const contentHeight = info.windowHeight - info.statusBarHeight - 44
    this.setData({ contentHeight })

    // 获取歌曲列表
    this.setupStateListener()

    // 初始化播放器
    this.setupAudioPlayer(id)
  },
  
  setupAudioPlayer: function(id) {
    // 获取播放器
    const audioContext = eventStore.state.audioContext
    this.setData({ audioContext }, () => {
      // 获取歌曲信息
      this.setupMusicInfo(id)
    })

    // 监听音乐事件
    audioContext.onPlay(() => {
      console.log("开始播放")
    })

    audioContext.onEnded(() => {
      console.log("歌曲播放结束")
      this.switchMusicInfo(true)
    })

    const info = wx.getSystemInfoSync()
    if (info.platform === "devtools") {
      audioContext.onWaiting(() => {
        audioContext.pause()
      })
    }
    audioContext.onCanplay(() => {
      console.log("canplay")
      audioContext.play()
    })

    audioContext.onTimeUpdate(() => {
      const currentTime = audioContext.currentTime 
      if (!this.data.isChanging) {
        this.setData({ currentTime: currentTime * 1000 })
        const sliderValue = currentTime * 1000 / this.data.durationTime * 100
        this.setData({ sliderValue })
      }

      // 获取需要展示的歌词
      const lyricList = this.data.lyricList
      const currentLyricIndex = this.data.currentLyricIndex
      let i = 0;
      for (; i < lyricList.length; i++) {
        let lyricItem = lyricList[i];
        if (currentTime * 1000 < lyricItem.time) {
          break;
        }
      }

      if (currentLyricIndex !== i - 1) {
        this.setData({ currentLyricIndex: i - 1 })
        const content = lyricList[i - 1] && lyricList[i - 1].content
        this.setData({ currentLyricContent: content })
        this.setData({ lyricScrollTop: (i - 1) * 35 })
      }
    })
  },

  setupMusicInfo: function(id) {
    // 获取播放的歌曲信息
    getPlayerMusic(id).then(res => {
      this.setData({ currentSong: res.songs[0] })
      this.setData({ durationTime: res.songs[0].dt })
    })

    // 获取播放的歌曲歌词
    getPlayerLyric(id).then(res => {
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      this.setData({ lyricList })
    })

    // 播放歌曲
    this.data.audioContext.stop()
    this.data.audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    this.data.audioContext.autoplay = true
  },

  handleSliderChanging: function(event) {
    this.setData({ isChanging: true })
    const sliderValue = event.detail.value
    this.setData({
      currentTime: this.data.durationTime * sliderValue / 100
    })
  },

  handleSliderChange: function(event) {
    const sliderValue = event.detail.value
    const currentTime = this.data.durationTime * sliderValue / 100
    this.data.audioContext.seek(currentTime / 1000)
    this.setData({ currentTime })
    this.setData({ sliderValue })
    this.setData({ isChanging: false })
  },

  handlePlayClick: function() {
    if (this.data.isPlaying) {
     this.data.audioContext.pause()
     this.setData({ isPlaying: false })
    } else {
     this.data.audioContext.play()
     this.setData({ isPlaying: true })
    }
  },

  handleSwiperChange: function(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },

  handleModeClick: function() {
    let playMode = this.data.playMode + 1
    if (playMode === 3) {
      playMode = 0
    }
    eventStore.setState("playMode", playMode)
  },

  handleNextMusic: function() {
    this.switchMusicInfo(true)
  },

  handlePrevMusic: function() {
    this.switchMusicInfo(false)
  },

  switchMusicInfo: function(isNext) {
    // 1.数据重置
    this.setData({ currentSong: {} })
    this.setData({ lyricList: [] })
    this.setData({ currentTime: 0 })
    this.setData({ durationTime: 0 })
    this.setData({ sliderValue: 0 })
    this.setData({ currentLyricIndex: 0 })
    this.setData({ currentLyricContent: "" })
    this.setData({ lyricScrollTop: 0 })

    // 2.获取歌曲
    let index = 0
    switch(this.data.playMode) {
      case 0: // 顺序播放
        index = isNext ? (this.data.playIndex + 1): (this.data.playIndex - 1)
        if (index === this.data.playList.length) index = 0
        if (index === -1) index = this.data.playList.length - 1
        break
      case 1: // 随机播放
        index = Math.floor(Math.random() * this.data.playList.length)
        break
      case 2:
        index = this.data.playIndex
        break
    }
    // this.setData({ playIndex: index })
    eventStore.setState("playIndex", index)
    const id = this.data.playList[index].id
    this.setupMusicInfo(id)
  },

  handleMusicListClick: function() {
    this.setData({ isShowPlayList: !this.data.isShowPlayList })
  },

  handleBackClick: function() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("music player onUnload")
    eventStore.offState("playList", this.handlePlayListListener)
    eventStore.offState("playIndex", this.handlePlayIndexListener)
    eventStore.offState("playMode", this.handlePlayModeLisnter)
  },

  setupStateListener: function() {
    eventStore.onState("playList", this.handlePlayListListener)
    eventStore.onState("playIndex", this.handlePlayIndexListener)
    eventStore.onState("playMode", this.handlePlayModeLisnter)
  },

  handlePlayListListener: function(res) {
    this.setData({ playList: res })
  },
  handlePlayIndexListener: function(res) {
    this.setData({ playIndex: res })
  },
  handlePlayModeLisnter: function(res) {
    this.setData({ playMode: res })
    this.setData({ modeName: modeNames[res] })
  }
})