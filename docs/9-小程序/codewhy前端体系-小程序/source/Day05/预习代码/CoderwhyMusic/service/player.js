import hyRequest from './request'

export function getPlayerMusic(ids) {
  return hyRequest.get("/song/detail", {
    ids
  })
}

export function getPlayerLyric(id) {
  return hyRequest.get("/lyric", {
    id
  })
}
