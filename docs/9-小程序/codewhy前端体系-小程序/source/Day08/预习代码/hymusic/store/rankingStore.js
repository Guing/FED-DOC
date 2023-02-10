import { HYEventStore } from "hy-event-store"
import { getPlaylistDetail } from "../services/music"

export const rankingsMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756
}
const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    fetchRankingDataAction(ctx) {
      for (const key in rankingsMap) {
        const id = rankingsMap[key]
        getPlaylistDetail(id).then(res => {
          ctx[key] = res.playlist
        })
      }
    }
  }
})

export default rankingStore
