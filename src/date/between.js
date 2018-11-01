/**
 * 简单计算两个日期在某个单位上的差值
 *
 * @param {Date} date1 第一个日期
 * @param {Date} date2 第二个日期
 * @returns 两个日期的差值，可以通过不同方法获取到不同单位的差值
 */
module.exports = function(date1, date2) {
  return {
    yaer() {
      return date2.getFullYear() - date1.getFullYear()
    },
    month() {
      return date2.getMonth() - date1.getMonth()
    },
    date() {
      return date2.getDate() - date1.getDate()
    },
    hour() {
      return date2.getHours() - date1.getHours()
    },
    minute() {
      return date2.getMinutes() - date1.getMinutes()
    },
    second() {
      return date2.getSeconds() - date1.getSeconds()
    },
    milliSecond() {
      return date2.getMilliseconds() - date1.getMilliseconds()
    },
    time() {
      return date2.getTime() - date1.getTime()
    },
    day() {
      return date2.getDay() - date1.getDay()
    }
  }
}
