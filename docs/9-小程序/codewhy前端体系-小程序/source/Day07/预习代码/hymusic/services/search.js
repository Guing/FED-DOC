import { hyRequest } from "./index";

export function getSearchHot() {
  return hyRequest.get({
    url: "/search/hot"
  })
}

export function getSearchSuggest(keywords) {
  return hyRequest.get({
    url: "/search/suggest",
    data: {
      keywords,
      type: "mobile"
    }
  })
}

export function getSearchResult(keywords) {
  return hyRequest.get({
    url: "/search",
    data: {
      keywords
    }
  })
}
