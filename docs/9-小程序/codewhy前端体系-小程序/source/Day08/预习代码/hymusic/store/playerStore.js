import { HYEventStore } from "hy-event-store"
import { getSongDetail, getSongLyric } from "../services/player"
import { parseLyric  } from "../utils/parse-lyric"

export const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSong: {},
    durationTime: 0,
    currentTime: 0,

    lyricInfos: [],
    currentLyricIndex: 0,
    currentLyricText: "",

    isFirstPlay: true,

    playListSongs: [],
    playListIndex: 0,

    playModeIndex: 0, // 0: 顺序播放 2:单曲循环 3:随机播放
    isPlaying: false
  },
  actions: {
    playMusicWithSongId(ctx, id) {
      // 1.保存当前的id
      ctx.id = id
      ctx.isPlaying = true
      if (ctx.currentSong.id !== id) {
        ctx.currentSong = {}
      }

      // 2.请求歌曲的数据
      getSongDetail(id).then(res => {
        const currentSong = res.songs[0]
        ctx.currentSong = currentSong
        ctx.durationTime = currentSong.dt
      })
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        const lyricInfos = parseLyric(lyricString)
        ctx.lyricInfos = lyricInfos
      })

      // 3.歌曲播放
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true

      // 4.监听一些事件
      if (ctx.isFirstPlay) {
        ctx.isFirstPlay = false
        this.dispatch("onAudioContextListener")
      }
    },

    onAudioContextListener(ctx) {
      audioContext.onTimeUpdate(() => {
        ctx.currentTime = audioContext.currentTime * 1000
  
        // 匹配歌词
        if (!ctx.lyricInfos.length) return
        let index = ctx.lyricInfos.length - 1
        for (let i = 0; i < ctx.lyricInfos.length; i++) {
          const lyricItem = ctx.lyricInfos[i]
          if (lyricItem.time > ctx.currentTime) {
            index = i - 1
            break
          }
        }
        if (index === ctx.currentLyricIndex || index === -1) return
        ctx.currentLyricIndex = index
        ctx.currentLyricText = ctx.lyricInfos[index].text
      })
  
      audioContext.onWaiting(() => {
        audioContext.pause()
      })
  
      audioContext.onCanplay(() => {
        if (ctx.isPlaying) {
          audioContext.play()
        }
      })

      audioContext.onEnded(() => {
        this.dispatch("changeNewSongAction")
      })
    },

    changeNewSongAction(ctx, isNext = true) {
      let index = ctx.playListIndex
      let length = ctx.playListSongs.length
      switch(ctx.playModeIndex) {
        case 0: // 顺序播放
          index = isNext ? index + 1: index -1
          if (index === -1) index = length - 1
          if (index === length) index = 0
          break
        case 1: // 单曲循环
          break
        case 2:
          index = Math.floor(Math.random() * length)
          break
      }

      ctx.playListIndex = index
  
      // 播放新歌曲
      const id = ctx.playListSongs[index].id
      // ctx.currentSong = ctx.playListSongs[index]
      // ctx.durationTime = ctx.currentSong.dt
      this.dispatch("playMusicWithSongId", id)
    },

    changePlayStatusAction(ctx) {
      if (audioContext.paused) {
        audioContext.play()
        ctx.isPlaying = true
      } else {
        audioContext.pause()
        ctx.isPlaying = false
      }
    }
  }
})

export default playerStore
