/**
 * 获取到最后一个获得焦点的元素
 * @returns {Element} 最后一个获取到焦点的元素
 */
var lastFocus = (lastFocusEl => {
  document.addEventListener(
    'focus',
    event => {
      lastFocusEl = event.target
    },
    true
  )
  document.addEventListener(
    'blur',
    event => {
      lastFocusEl = null
    },
    true
  )
  return () => lastFocusEl
})(null)

export default lastFocus
