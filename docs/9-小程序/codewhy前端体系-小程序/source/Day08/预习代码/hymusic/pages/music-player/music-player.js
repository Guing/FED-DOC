// pages/music-player/music-player.js
import { throttle } from "underscore"
import playerStore, { audioContext } from "../../store/playerStore"

const app = getApp()

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
    // this.setupAudioPlayer()
    // playerStore.dispatch("playMusicWithSongId", id)
    playerStore.onStates(["currentSong", "durationTime", "currentTime", "lyricInfos", "currentLyricIndex", "currentLyricText", "playModeIndex", "isPlaying"], this.getSongAllInfos)

    // store歌曲数据列表
    playerStore.onStates(["playListSongs", "playListIndex"], this.getPlayListHanlder)
  },

  // setupAudioPlayer() {
  //   const id = this.data.id
  //   this.setData({ isPlaying: true })

  //   // 歌曲请求
  //   getSongDetail(id).then(res => {
  //     const currentSong = res.songs[0]
  //     this.setData({ currentSong })
  //     this.setData({ durationTime: currentSong.dt })
  //   })
  //   getSongLyric(id).then(res => {
  //     const lyricString = res.lrc.lyric
  //     const lyricInfos = parseLyric(lyricString)
  //     this.setData({ lyricInfos })
  //   })

  //   // 1.歌曲播放
  //   audioContext.stop()
  //   audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
  //   audioContext.autoplay = true

  //   // 2.进度监听
  //   if (this.data.isFirstPlay) {
  //     this.onAudioContextListener()
  //     this.data.isFirstPlay = false
  //   }
  // },

  // onAudioContextListener() {
  //   const updateProress = throttle(this.updateProgress, 1000)
  //   audioContext.onTimeUpdate(() => {
  //     updateProress()
  //     this.setData({ currentTime: audioContext.currentTime * 1000 })

  //     // 匹配歌词
  //     if (!this.data.lyricInfos.length) return
  //     let index = this.data.lyricInfos.length - 1
  //     for (let i = 0; i < this.data.lyricInfos.length; i++) {
  //       const lyricItem = this.data.lyricInfos[i]
  //       if (lyricItem.time >= this.data.currentTime) {
  //         index = i - 1
  //         break
  //       }
  //     }
  //     if (index === this.data.currentLyricIndex) return
  //     this.setData({ currentLyricIndex: index, currentLyricText: this.data.lyricInfos[index].text })

  //     // 改变scrollTop
  //     this.setData({ lyricScrollTop: index * 35 })
  //   })

    // audioContext.onWaiting(() => {
    //   audioContext.pause()
    // })

  //   audioContext.onCanplay(() => {
  //     audioContext.play()
  //   })
  // },

  updateProgress: throttle(function(currentTime) {
    if (!this.data.isSliderChanging) {
      const sliderValue = currentTime / this.data.durationTime * 100
      this.setData({ sliderValue, currentTime })
    }
  }, 500, { leading: false, trailing: false }),

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
    playerStore.dispatch("changeNewSongAction", false)
  },
  onNextBtnTap() {
    // this.changeNewSong(true)
    playerStore.dispatch("changeNewSongAction", true)
  },
  // changeNewSong(isNext) {
  //   let index = this.data.playListIndex
  //   switch(this.data.playModeIndex) {
  //     case 0: // 顺序播放
  //       index = isNext ? index + 1: index -1
  //       if (index === -1) index = this.data.playListSongs.length - 1
  //       if (index === this.data.playListSongs.length) index = 0
  //       break
  //     case 1: // 单曲循环
  //       break
  //     case 2:
  //       index = Math.floor(Math.random() * this.data.playListSongs.length)
  //       break
  //   }
    
  //   playerStore.setState("playListIndex", index)

  //   // 播放新歌曲
  //   const currentSong = this.data.playListSongs[index]
  //   this.setData({ id: currentSong.id, currentSong: {} })
  //   this.setupAudioPlayer()
  // },
  onModeBtnTap() {
    let modeIndex = this.data.playModeIndex + 1
    if (modeIndex === modeNames.length) modeIndex = 0
    playerStore.setState("playModeIndex", modeIndex)
  },
  onPlayOrPauseTap() {
    // if (audioContext.paused) {
    //   audioContext.play()
    //   playerStore.setState("isPlaying", true)
    // } else {
    //   audioContext.pause()
    //   playerStore.setState("isPlaying", false)
    // }
    playerStore.dispatch("changePlayStatusAction")
  },

  // ====================== 共享的数据 ====================== 
  getPlayListHanlder(value) {
    if (value.playListSongs) {
      this.setData({ playListSongs: value.playListSongs })
    }
    if (value.playListIndex !== undefined) {
      const index = value.playListIndex
      this.setData({ playListIndex: index })
    }
  },
  getSongAllInfos({ 
    currentSong, durationTime, currentTime, lyricInfos, currentLyricIndex, currentLyricText,
    playModeIndex, isPlaying
  }) {
    if (currentSong) {
      this.setData({ currentSong })
    }
    if (durationTime) {
      this.setData({ durationTime })
    }
    if (currentTime) {
      // this.setData({ currentTime })
      this.updateProgress(currentTime)
    }
    if (lyricInfos) {
      this.setData({ lyricInfos })
    }
    if (currentLyricIndex !== undefined) {
      this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
    }
    if (currentLyricText) {
      this.setData({ currentLyricText })
    }

    if (playModeIndex !== undefined) {
      this.setData({ playModeIndex, playModeName: modeNames[playModeIndex] })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
  },
  onUnload() {
    playerStore.offStates(["playListSongs", "playListIndex"], this.getPlayListHanlder)
    playerStore.offStates(["currentSong", "durationTime", "currentTime", "lyricInfos", "currentLyricIndex", "currentLyricText", "playModeIndex", "isPlaying"], this.getSongAllInfos)
  }
})