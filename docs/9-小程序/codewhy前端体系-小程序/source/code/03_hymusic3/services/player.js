import { hyRequest } from "./index"

export function getSongDetail(ids) {
  return hyRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return hyRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}
