// @ts-check

/**
 * 将一个 Iterator 迭代器转换为一个 Array
 * 目前 {@override Array.from} 已取代改函数
 * @param {Iterator.<Object>} iterator Iterator 迭代器
 * @return {Array.<Object>} Iterator 中每一项元素转换而得到的 Array
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
