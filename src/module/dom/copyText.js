// @ts-check
/**
 * 复制一段文本内容
 * @param {String} text 要进行复制的文本
 * @returns {Boolean} 是否复制成功
 */
export function copyText (text) {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', text)
  input.select()
  const res = document.execCommand('copy')
  document.body.removeChild(input)
  return res
}
