// @ts-check

let lastFocusEl

document.addEventListener(
  'focus',
  event => {
    lastFocusEl = event.target
  },
  true
)
document.addEventListener(
  'blur',
  () => {
    lastFocusEl = null
  },
  true
)
/**
 * 获取到最后一个获得焦点的元素
 * @returns {Element} 最后一个获取到焦点的元素
 */
export function lastFocus () {
  return lastFocusEl
}
