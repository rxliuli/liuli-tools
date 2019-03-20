/**
 * 将对象的属性置空
 * @param {Object} obj 需要置空属性的对象
 * @returns {Object} 返回一个新的对象
 */
function emptyField (obj) {
  const res = {}
  for (const k in obj) {
    res[k] = null
  }
  return res
}

export default emptyField
