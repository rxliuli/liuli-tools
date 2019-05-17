/**
 * 将数组转化为一个 Object 对象
 * @deprecated 已废弃，请使用更好的 {@link arrayToMap} 替代
 * @param {Array.<Object>} arr 需要进行转换的数组
 * @param {Function} kFn 生成对象属性名的函数
 * @param {Function} [vFn] 生成对象属性值的函数，默认为数组中的迭代元素
 * @returns {Object} 转化得到的对象
 */
export function toObject<T>(
  arr: T[],
  kFn: (item: T, ...args: any[]) => any,
  vFn: (item: T, ...args: any[]) => any = (item: T) => item,
): object {
  return arr.reduce(
    (res: Record<string | number | symbol, any>, item, ...args) => {
      const k = kFn(item, ...args)
      if (!Reflect.has(res, k)) {
        res[k] = vFn(item, ...args)
      }
      return res
    },
    {},
  )
}
