/**
 * 为 js 中的 Date 对象原型添加 format 格式化方法
 * @param date 要进行格式化的日期
 * @param fmt 日期的格式，格式 {@code '[Y+|y+][M+][D+|d+][H+|h+][m+][s+][S+][q+]'}
 * @returns 格式化得到的结果
 */
export function dateFormat(date: Date, fmt: string): string {
  const timeFormatDefaults = {
    'Y+|y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'D+|d+': date.getDate(), // 日
    'H+|h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds(), // 毫秒
  }
  for (const k in timeFormatDefaults) {
    if (!new RegExp('(' + k + ')').test(fmt)) {
      continue
    }
    if (k === 'Y+|y+') {
      fmt = fmt.replace(
        RegExp.$1,
        ('' + timeFormatDefaults[k]).substr(4 - RegExp.$1.length),
      )
    } else if (k === 'S+') {
      let lens = RegExp.$1.length
      lens = lens === 1 ? 3 : lens
      fmt = fmt.replace(
        RegExp.$1,
        ('00' + timeFormatDefaults[k]).substr(
          ('' + timeFormatDefaults[k]).length - 1,
          lens,
        ),
      )
    } else {
      const v = Reflect.get(timeFormatDefaults, k)
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? v : ('00' + v).substr(('' + v).length),
      )
    }
  }
  return fmt
}
