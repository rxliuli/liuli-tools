/**
 * 简单计算两个日期在某个单位上的差值
 * 计算日期单位差关键在于要把计算单位后面的数量给 “抹平” 掉
 * 例如 2018-12-31 和 2019-01-01 号，相差了一年，相差了一个月，相差了 1 天，计算某个单位的时候，把单位右侧的全部变成 0 就好了。
 * 例如计算年的时候就直接计算 2018-12-01 2019-01-01 看起来差一个月就正常了
 *
 * @param {Date} date1 第一个日期
 * @param {Date} date2 第二个日期
 * @returns 两个日期的差值，可以通过不同方法获取到不同单位的差值
 */
export default function(date1, date2) {
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
