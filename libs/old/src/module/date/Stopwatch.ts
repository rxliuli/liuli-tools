/**
 * 补 0 函数
 * @param time 为时分秒补首位 0
 * @returns 补零得到的字符串
 */
function zeroPadding(time: number): string {
  return (time >= 10 ? '' : '0') + time
}

/**
 * 秒表
 * 标准格式 `HH:mm:ss`
 * 主要适用场景是格式化/解析时间差值
 */
export class Stopwatch {
  /**
   * 格式化一个以秒为单位的绝对时间为标准时间格式的字符串
   * @param time 时间/s
   * @returns 格式化后的字符串
   */
  static format(time: number): string {
    const seconds = time % 60
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 60 / 60)
    return `${zeroPadding(hours)}:${zeroPadding(minutes)}:${zeroPadding(
      seconds,
    )}`
  }

  /**
   * 解析一个标准的时间字符串为秒为单位的绝对时间
   * @param str 时间字符串
   * @returns 解析得到的时间/s
   */
  static parse(str: string): number {
    const [, hours, minutes, seconds] = /(\d+):(\d+):(\d+)/.exec(
      str,
    ) as string[]
    return (
      parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds)
    )
  }
}
