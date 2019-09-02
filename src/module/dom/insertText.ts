import { getCursorPosition } from './getCursorPosition'
import { setCursorPosition } from './setCursorPosition'

/**
 * 在指定位置后插入文本
 * @param el 需要设置的输入框元素
 * @param text 要插入的值
 * @param start 开始位置，默认为当前光标处
 */
export function insertText(
  el: HTMLFormElement,
  text: string,
  start: number = getCursorPosition(el),
) {
  const value = el.value
  el.value = value.substr(0, start) + text + value.substr(start)
  setCursorPosition(el, start + text.length)
}
