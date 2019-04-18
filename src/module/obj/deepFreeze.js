// @ts-check

/**
 * 递归使对象不可变
 * @param {Object} obj 任何非空对象
 * @returns {Object} 新的不可变对象
 */
export function deepFreeze (obj) {
  if (obj === undefined || obj === null) {
    return
  }
  // 数组和对象分别处理
  if (obj instanceof Array) {
    obj.forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v)
      }
    })
  } else if (obj instanceof Object) {
    Object.values(obj).forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v)
      }
    })
  }
  return Object.freeze(obj)
}
