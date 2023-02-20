import { hyRequest } from "./index"

export function getTopMV(offset = 0, limit = 20) {
  return hyRequest.get({
    url: "/top/mv",
    data: {
      limit,
      offset
    }
  })
}

export function getMVUrl(id) {
  return hyRequest.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}

export function getMVInfo(mvid) {
  return hyRequest.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })
}

export function getMVRelated(id) {
  return hyRequest.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })
}
