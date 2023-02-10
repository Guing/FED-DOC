import { HYEventStore } from 'hy-event-store'
import { getTopList } from '../service/music'
import { getTopMV } from '../service/video'

const rankingMap = { 0: "upRanking", 1: "hotRanking", 2: "newRanking", 3: "originRanking" }

const autoContext = wx.createInnerAudioContext()

const eventStore = new HYEventStore({
  state: {
    upRanking: {},
    hotRanking: {},
    newRanking: {},
    originRanking: {},
    topMV: [],
    hashMoreVM: true,

    audioContext: autoContext,
    playList: [],
    playIndex: 0,
    playMode: 0, // 0: 顺序播放 1: 随机播放 2: 单曲循环
  },
  actions: {
    getRankingsAction(ctx) {
      for (let i = 0; i < 4; i++) {
        let num = i
        if (i === 2) num = 1
        getTopList(num).then(res => {
          switch(i) {
            case 0: // 飙升榜
              ctx.upRanking = res.playlist
              break
            case 1: // 热门榜
              ctx.hotRanking = res.playlist
              break
            case 2: // 新歌榜
              ctx.newRanking = res.playlist
              break
            case 3: // 原创榜
              ctx.originRanking = res.playlist
              break
          }
        })
      }
    },
    getTopMVAction(ctx, offset) {
      offset = offset !== undefined ? offset: ctx.topMV.length
      if (!ctx.hashMoreVM && offset !== 0) return
      getTopMV(offset).then(res => {
        ctx.hashMoreVM = res.hasMore
        if (offset === 0) {
          ctx.topMV = res.data
        } else {
          ctx.topMV = [...ctx.topMV, ...res.data]
        }
      })
    }
  }
})


export default eventStore
export {
  rankingMap
}
