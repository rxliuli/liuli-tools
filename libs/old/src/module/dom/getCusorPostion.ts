import { getCursorPosition } from './getCursorPosition'

/**
 * 获取输入框中光标所在位置
 * @param  {HTMLFormElement} el 需要获取的输入框元素
 * @returns 光标所在位置的下标
 * @deprecated 已废弃，请使用正确更名后的 {@link getCursorPosition} 函数
 */
export function getCusorPostion(el: HTMLFormElement): number {
  return getCursorPosition(el)
}
