// @ts-check

/**
 * 将一个 Iterator 迭代器转换为一个 Array
 * 目前 {@override Array.from} 已取代改函数
 * @typedef {any} T 集合泛型类型
 * @param {Iterator.<T>} iterator Iterator 迭代器
 * @return {Array.<T>} Iterator 中每一项元素转换而得到的 Array
 */
export function asIterator (iterator) {
  var arr = []
  while (true) {
    var next = iterator.next()
    if (next.done) {
      break
    }
    arr.push(next.value)
  }
  return arr
}
