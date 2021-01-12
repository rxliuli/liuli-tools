import { getCursorPosition } from './getCursorPosition'
import { setCursorPosition } from './setCursorPosition'

/**
 * 在指定范围内删除文本
 * @param el 需要设置的输入框元素
 * @param start 开始位置，默认为当前选中开始位置
 * @param end 结束位置，默认为当前选中结束位置
 */
export function removeText(
  el: HTMLFormElement,
  start: number = el.selectionStart,
  end: number = el.selectionEnd,
) {
  // 删除之前必须要 [记住] 当前光标的位置
  const index = getCursorPosition(el)
  const value = el.value
  el.value = value.substr(0, start) + value.substr(end, value.length)
  setCursorPosition(el, index)
}
