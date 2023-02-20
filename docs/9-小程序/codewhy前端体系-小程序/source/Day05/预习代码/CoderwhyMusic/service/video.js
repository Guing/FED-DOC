import hyRequest from './request'

export function getTopMV(offset, limit = 20) {
  return hyRequest.get("/top/mv", {
    offset,
    limit
  })
}

export function getMVDetail(id) {
  return hyRequest.get("/mv/detail", {
    mvid: id
  })
}

export function getMVURL(id) {
  return hyRequest.get("/mv/url", {
    id
  })
}

export function getRelateMV(id) {
  return hyRequest.get("/related/allvideo", {
    id
  })
}
