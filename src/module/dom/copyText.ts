/**
 * 复制一段文本内容
 * @param text 要进行复制的文本
 * @returns 是否复制成功
 */
export function copyText(text: string): boolean {
  const $el = document.createElement('textarea')
  $el.style.position = 'fixed'
  $el.style.top = '-1000px'
  document.body.appendChild($el)
  $el.value = text
  $el.select()
  const res = document.execCommand('copy')
  document.body.removeChild($el)
  return res
}
