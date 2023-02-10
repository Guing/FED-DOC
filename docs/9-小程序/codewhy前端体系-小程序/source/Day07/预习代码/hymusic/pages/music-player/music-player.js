// pages/music-player/music-player.js
import { getSongDetail, getSongLyric } from "../../services/player"
import { throttle } from "underscore"
import { parseLyric } from "../../utils/parse-lyric"
import playerStore from "../../store/playerStore"

const app = getApp()
const audioContext = wx.createInnerAudioContext()

const modeNames = ["order", "repeat", "random"]

Page({
  data: {
    statusHeight: 20,
    currentPage: 0,
    contentHeight: 555,

    isFirstPlay: true,
    id: 0,
    currentSong: {},
    currentTime: 0,
    durationTime: 0,
    lyricInfos: [],
    currentLyricIndex: 0,
    currentLyricText: "",
    lyricScrollTop: 0,

    playListSongs: [],
    playListIndex: 0,
    playModeIndex: 0,
    playModeName: "order",
    isPlaying: false,

    sliderValue: 0,
    isSliderChanging: false,
  },
  onLoad(options) {
    const id = options.id
    this.setData({ id })

    // 设备信息
    this.setData({ statusHeight: app.globalData.statusHeight })
    this.setData({ contentHeight: app.globalData.windowHeight })

    // 播放歌曲
    this.setupAudioPlayer()

    // store歌曲数据列表
    playerStore.onStates(["playListSongs", "playListIndex"], this.getPlayListHanlder)
  },

  setupAudioPlayer() {
    const id = this.data.id
    this.setData({ isPlaying: true })

    // 歌曲请求
    getSongDetail(id).then(res => {
      const currentSong = res.songs[0]
      this.setData({ currentSong })
      this.setData({ durationTime: currentSong.dt })
    })
    getSongLyric(id).then(res => {
      const lyricString = res.lrc.lyric
      const lyricInfos = parseLyric(lyricString)
      this.setData({ lyricInfos })
    })

    // 1.歌曲播放
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true

    // 2.进度监听
    if (this.data.isFirstPlay) {
      this.onAudioContextListener()
      this.data.isFirstPlay = false
    }
  },

  onAudioContextListener() {
    console.log("添加监听");
    const updateProress = throttle(this.updateProgress, 1000)
    audioContext.onTimeUpdate(() => {
      updateProress()
      this.setData({ currentTime: audioContext.currentTime * 1000 })

      // 匹配歌词
      if (!this.data.lyricInfos.length) return
      let index = this.data.lyricInfos.length - 1
      for (let i = 0; i < this.data.lyricInfos.length; i++) {
        const lyricItem = this.data.lyricInfos[i]
        if (lyricItem.time >= this.data.currentTime) {
          index = i - 1
          break
        }
      }
      if (index === this.data.currentLyricIndex) return
      this.setData({ currentLyricIndex: index, currentLyricText: this.data.lyricInfos[index].text })

      // 改变scrollTop
      this.setData({ lyricScrollTop: index * 35 })
    })

    audioContext.onWaiting(() => {
      audioContext.pause()
    })

    audioContext.onCanplay(() => {
      audioContext.play()
    })
  },

  updateProgress() {
    if (!this.data.isSliderChanging) {
      const sliderValue = this.data.currentTime / this.data.durationTime * 100
      this.setData({ sliderValue })
    }
  },

  onSliderChange(event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue: value, currentTime, isSliderChanging: false })
  },
  onSliderChanging(event) {
    const value = event.detail.value

    // 计算当前时间
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime: currentTime, isSliderChanging: true })
  },

  onSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },
  onBackTap() {
    wx.navigateBack()
  },

  // ======== 歌曲的控制 ========
  onPrevBtnTap() {
    this.changeNewSong(false)
  },
  onNextBtnTap() {
    this.changeNewSong(true)
  },
  changeNewSong(isNext) {
    let index = this.data.playListIndex
    switch(this.data.playModeIndex) {
      case 0: // 顺序播放
        index = isNext ? index + 1: index -1
        if (index === -1) index = this.data.playListSongs.length - 1
        if (index === this.data.playListSongs.length) index = 0
        break
      case 1: // 单曲循环
        break
      case 2:
        index = Math.floor(Math.random() * this.data.playListSongs.length)
        break
    }
    
    playerStore.setState("playListIndex", index)

    // 播放新歌曲
    const currentSong = this.data.playListSongs[index]
    this.setData({ id: currentSong.id, currentSong: {} })
    this.setupAudioPlayer()
  },
  onModeBtnTap() {
    let modeIndex = this.data.playModeIndex + 1
    if (modeIndex === modeNames.length) modeIndex = 0
    this.setData({ playModeIndex: modeIndex, playModeName: modeNames[modeIndex] })
  },
  onPlayOrPauseTap() {
    if (audioContext.paused) {
      audioContext.play()
    } else {
      audioContext.pause()
    }
    this.setData({ isPlaying: audioContext.paused })
  },

  // 共享的数据
  getPlayListHanlder(value) {
    if (value.playListSongs) {
      this.setData({ playListSongs: value.playListSongs })
    }
    if (value.playListIndex !== undefined) {
      const index = value.playListIndex
      this.setData({ playListIndex: index })
    }
  },
  onUnload() {
    playerStore.offStates(["playListSongs", "playListIndex"], this.getPlayListHanlder)
  }
})