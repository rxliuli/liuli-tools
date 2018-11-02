/**
 * js 数组转换为一个 Object 对象
 * @param fn 转换方法
 * fn 必须接受数组中的每一个元素作为参数, 并返回一个 [key, value] 形式的数组
 * @returns {{}} 得到的 Object 对象
 */
export default function(arr, fn) {
  if (!fn) {
    throw new Error('Array 对象的 toObject() 方法的参数不能为空')
  }
  const obj = {}
  arr.map(fn).forEach(function(item) {
    obj[item[0]] = item[1]
  })
  return obj
}
