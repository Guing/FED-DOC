import hyRequest from './request'

export function getHotSearch() {
  return hyRequest.get("/search/hot")
}

export function getSuggestSearch(value) {
  return hyRequest.get("/search/suggest", {
    keywords: value
  })
}

export function getSearchResult(value) {
  return hyRequest.get("/search", {
    keywords: value
  })
}