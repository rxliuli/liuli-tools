/**
 * 深度比较两个对象是否相等
 * @param x 任何对象
 * @param y 任何对象
 * @returns 是否相等
 */
export function compare(x: any, y: any): boolean {
  if (
    (typeof x === 'number' || x instanceof Number) &&
    (typeof y === 'number' || y instanceof Number)
  ) {
    const _x = +x
    const _y = +y
    // 如果都是 NaN 则直接返回 true
    if (isNaN(_x) && isNaN(_y)) {
      return true
    }
    // 如果是 -0/+0 则返回 false
    if (_x === _y) {
      return 1 / _x === 1 / _y
    }
    // 如果均为数字且两数之差的绝对值小于浮点数的最小精度（此举主要是为了避免浮点数的精度丢失）
    if (Math.abs(_x - _y) < Number.EPSILON) {
      return true
    }
  }
  // 如果恒等表达式成立则直接返回 true
  if (x === y) {
    return true
  }
  // 比较正则和字符串
  if (
    (x instanceof RegExp && y instanceof RegExp) ||
    ((typeof x === 'string' || x instanceof String) &&
      (typeof y === 'string' || y instanceof String))
  ) {
    return x.toString() === y.toString()
  }
  // 如果都是时间则比较它们的时间戳
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime()
  }
  // 如果两者有一个不是 Object 类型的话则直接返回 false
  // 注: 此处直接返回 false 是因为特殊原生类型的都在上面处理过了
  // 注: Array 可以按照 Object 的逻辑进行处理
  if (!(x instanceof Object && y instanceof Object)) {
    return false
  }
  // 比较它们的原型
  if (x.prototype !== y.prototype) {
    return false
  }
  // 比较构造函数
  if (x.constructor !== y.constructor) {
    return false
  }
  // 比较 y 中的属性是否全部都在 x 中
  for (const p of Object.keys(y)) {
    if (!Reflect.has(x, p)) {
      return false
    }
  }
  // 比较 x 中的属性是否全部都在 y 中
  for (const p of Object.keys(x)) {
    if (!Reflect.has(y, p)) {
      return false
    }
    // 比较每个元素的类型，如果不同则直接返回 false
    if (typeof y[p] !== typeof x[p]) {
      return false
    }
    // 递归比较每个元素
    if (!compare(x[p], y[p])) {
      return false
    }
  }
  // 全部比较完成仍然没有结果就返回 true
  return true
}
