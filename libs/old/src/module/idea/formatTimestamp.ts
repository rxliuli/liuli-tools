function formatTime(time: number): string {
  return time.toString().padStart(2, '0')
}
/**
 *将秒转换为时分秒的字符串
 * @param seconds 秒
 * @return 格式化的时间字符串
 */
export function formatTimestamp(seconds: number): string {
  const s = formatTime(seconds % 60)
  const m = formatTime(Math.floor((seconds / 60) % 60))
  const h = formatTime(Math.floor(seconds / 3600))
  return `${h}:${m}:${s}`
}
