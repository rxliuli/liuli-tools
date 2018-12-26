/**
 * 将一个 Iterator 迭代器转换为一个 Array
 * @param {Iterator} iterator Iterator 迭代器
 * @return {Array} Iterator 中每一项元素转换而得到的 Array
 */
function asIterator(iterator) {
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

export default asIterator
