// @ts-check
import { getCusorPostion } from './getCusorPostion'
import { setCusorPostion } from './setCusorPostion'

/**
 * 在指定位置后插入文本
 * @param {HTMLFormElement} el 需要设置的输入框元素
 * @param {String} text 要插入的值
 * @param {Number} [start] 开始位置，默认为当前光标处
 */
export function insertText (el, text, start = getCusorPostion(el)) {
  var value = el.value
  el.value = value.substr(0, start) + text + value.substr(start)
  setCusorPostion(el, start + text.length)
}
