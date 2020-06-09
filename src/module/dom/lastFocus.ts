import { Nullable } from '../interface/Nullable'

let lastFocusEl: Nullable<Element> | EventTarget

/**
 * 获取到最后一个获得焦点的元素
 * @returns 最后一个获取到焦点的元素
 */
function _lastFocus(): Nullable<Element> | EventTarget {
  return lastFocusEl
}

export const lastFocus = Object.assign(_lastFocus, {
  init() {
    document.addEventListener(
      'focus',
      event => {
        lastFocusEl = event.target
      },
      true,
    )
    document.addEventListener(
      'blur',
      () => {
        lastFocusEl = null
      },
      true,
    )
  },
})
