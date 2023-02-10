
// [01:18.86]基于你还爱我
const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lrcString) {
  const lyricInfos = []

  const lyricLines = lrcString.split("\n")
  for (const lineString of lyricLines) {
    const results = timeReg.exec(lineString)
    if (!results) continue
    const minute = results[1] * 60 * 1000
    const second = results[2] * 1000
    const mSecond = results[3].length === 2 ? results[3] * 10: results[3] * 1
    const time = minute + second + mSecond
    const text = lineString.replace(timeReg, "")
    lyricInfos.push({ time, text })
  }
  return lyricInfos
}
