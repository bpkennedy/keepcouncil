const SECONDS_IN_YEAR = 31536000
const SECONDS_IN_DAY = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60
const SWG_SECONDS_OFFSET = 1595214033

module.exports.Clock = class Clock {
  static currentDate() {
    return new Date()
  }

  static currentSwgDate() {
    const time = Date.now()

    let timeLeft = Math.floor(time / 1000) + SECONDS_IN_DAY - SWG_SECONDS_OFFSET

    const year = Math.floor(timeLeft / SECONDS_IN_YEAR)
    timeLeft -= year * SECONDS_IN_YEAR
    const day = Math.floor(timeLeft / SECONDS_IN_DAY)
    timeLeft -= day * SECONDS_IN_DAY
    const hour = Math.floor(timeLeft / SECONDS_IN_HOUR)
    timeLeft -= hour * SECONDS_IN_HOUR
    const minute = Math.floor(timeLeft / SECONDS_IN_MINUTE)
    timeLeft -= minute * SECONDS_IN_MINUTE
    const second = Math.floor(timeLeft)

    return `Y${year} D${day}, ${hour}:${minute}:${second}`
  }
}