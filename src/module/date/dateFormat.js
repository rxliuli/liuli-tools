// @ts-check

/**
 * 为 js 中的 Date 对象原型添加 format 格式化方法
 * @param {Date} date 要进行格式化的日期
 * @param {String} fmt 日期的格式
 * @returns {String} 格式化得到的结果
 */
export function dateFormat (date, fmt) {
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  }
  for (var k in o) {
    if (!new RegExp('(' + k + ')').test(fmt)) {
      continue
    }
    if (k === 'y+') {
      fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
    } else if (k === 'S+') {
      var lens = RegExp.$1.length
      lens = lens === 1 ? 3 : lens
      fmt = fmt.replace(
        RegExp.$1,
        ('00' + o[k]).substr(('' + o[k]).length - 1, lens)
      )
    } else {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
