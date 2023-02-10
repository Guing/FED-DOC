import { HYEventStore } from "hy-event-store"

const playerStore = new HYEventStore({
  state: {
    playListSongs: [],
    playListIndex: 0
  }
})

export default playerStore
