// @ts-check
/**
 * 根据 html 字符串创建 Element 元素
 * @param {String} str html 字符串
 * @returns {Element} 创建的 Element 元素
 */
export function createElByString (str) {
  var root = document.createElement('div')
  root.innerHTML = str
  return root.querySelector('*')
}
