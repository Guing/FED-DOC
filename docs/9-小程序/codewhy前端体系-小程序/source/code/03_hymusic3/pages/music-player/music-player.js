// pages/music-player/music-player.js
import { getSongDetail, getSongLyric } from "../../services/player"
import { parseLyric } from "../../utils/parse-lyric"
import { throttle } from 'underscore'

const app = getApp()

// 创建播放器
const audioContext = wx.createInnerAudioContext()

Page({
  data: {
    pageTitles: ["歌曲", "歌词"],
    currentPage: 0,
    contentHeight: 0,

    id: 0,
    currentSong: {},
    lyricInfos: [],
    currentLyricText: "",
    currentLyricIndex: -1,

    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isSliderChanging: false,
    isWaiting: false,
    isPlaying: true
  },
  onLoad(options) {
    // 0.获取设备信息
    this.setData({ 
      statusHeight: app.globalData.statusHeight,
      contentHeight: app.globalData.contentHeight
    })

    // 1.获取传入的id
    const id = options.id
    this.setData({ id })

    // 2.请求歌曲相关的数据
    // 2.1.根据id获取歌曲的详情
    getSongDetail(id).then(res => {
      this.setData({ 
        currentSong: res.songs[0],
        durationTime: res.songs[0].dt
      })
    })

    // 2.2.根据id获取歌词的信息
    getSongLyric(id).then(res => {
      const lrcString = res.lrc.lyric
      const lyricInfos = parseLyric(lrcString)
      this.setData({ lyricInfos })
      console.log(lyricInfos);
    })

    // 3.播放当前的歌曲
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true

    // 4.监听播放的进度
    const throttleUpdateProgress = throttle(this.updateProgress, 500, { 
      leading: false,
      trailing: false 
    })
    audioContext.onTimeUpdate(() => {
      // 1.更新歌曲的进度
      if (!this.data.isSliderChanging && !this.data.isWaiting) {
        throttleUpdateProgress()
      }

      // 2.匹配正确的歌词
      if (!this.data.lyricInfos.length) return
      let index = this.data.lyricInfos.length - 1
      for (let i = 0; i < this.data.lyricInfos.length; i++) {
        const info = this.data.lyricInfos[i]
        if (info.time > audioContext.currentTime * 1000) {
          index = i - 1
          break
        }
      }
      if (index === this.data.currentLyricIndex) return
      const currentLyricText = this.data.lyricInfos[index].text
      this.setData({ currentLyricText, currentLyricIndex: index })
    })
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    audioContext.onCanplay(() => {
      audioContext.play()
    })
  },

  updateProgress() {
    // 1.记录当前的时间
    // 2.修改sliderValue
    const sliderValue = this.data.currentTime / this.data.durationTime * 100
    this.setData({ 
      currentTime: audioContext.currentTime * 1000,
      sliderValue
    })
  },


  // ==================== 事件监听 ==================== 
  onSwiperChange(event) {
    this.setData({ currentPage: event.detail.current })
  },
  onNavTabItemTap(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentPage: index })
  },

  onSliderChange(event) {
    console.log("点击了滑块----------------------");
    this.data.isWaiting = true
    setTimeout(() => {
      this.data.isWaiting = false
    }, 1500)
    // 1.获取点击滑块位置对应的value
    const value = event.detail.value

    // 2.计算出要播放的位置时间
    const currentTime = value / 100 * this.data.durationTime

    // 3.设置播放器, 播放计算出的时间
    audioContext.seek(currentTime / 1000)
    this.setData({ currentTime, isSliderChanging: false, sliderValue: value })
  },
  onSliderChanging(event) {
    // 1.获取滑动到的位置的value
    const value = event.detail.value

    // 2.根据当前的值, 计算出对应的时间
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime })

    // 3.当前正在滑动
    this.data.isSliderChanging = true
  },

  onPlayOrPauseTap() {
    if (!audioContext.paused) {
      audioContext.pause()
      this.setData({ isPlaying: false })
    } else {
      audioContext.play()
      this.setData({ isPlaying: true })
    }
  }
})