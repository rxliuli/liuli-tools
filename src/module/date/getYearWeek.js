// @ts-check

/**
 * 获取一年内的第多少星期
 * @deprecated 不推荐使用，请使用 {@link dateEnhance} 代替
 * @returns {Number}
 */
export function getYearWeek (date) {
  /*
    date1是当前日期
    date2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */
  const nowTime = date.getTime()
  const startTime = new Date(date.getFullYear(), 0, 1).getTime()
  var difTime = nowTime - startTime
  return Math.floor(difTime / (24 * 3600 * 1000) / 7)
}
