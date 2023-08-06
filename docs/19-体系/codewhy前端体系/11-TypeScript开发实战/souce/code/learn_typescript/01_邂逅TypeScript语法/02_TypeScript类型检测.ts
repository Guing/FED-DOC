function getLength(args: { length: number }) {
  return args.length
}

getLength("aaaaa")
getLength(["abc", "cba", "nba", 123])
const info = {
  length: 100
}

getLength(info)

// getLength(123)

export {}
