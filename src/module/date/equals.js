/**
 * 比较两个日期的值是否相等
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 是否值相等
 */
export default function(date1, date2) {
  // 两个日期都是空的时候认为相等
  if (!date1 && !date2) {
    return true
  }
  // 两个日期只有一个为空
  if ((!date1 && date2) || (date1 && !date2)) {
    return false
  }
  return date1.getTime() === date2.getTime()
}
