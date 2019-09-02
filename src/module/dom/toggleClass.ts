/**
 * 切换 DOM 元素的 class
 * @param {Element} el DOM 元素
 * @param {Object} obj 切换的状态/class 键值对象
 * @return 根据状态切换 class 的函数
 */
export function toggleClass<K extends Exclude<PropertyKey, symbol>>(
  el: Element,
  obj: Record<K, any>,
) {
  const arr = Object.entries(obj)
  /**
   * 返回切换 class 的函数
   * @param state 切换的状态
   */
  return function toggle(state: K) {
    arr.forEach(([, v]) => el.classList.remove(v))
    el.classList.add(obj[state])
  }
}
