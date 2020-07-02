import { returnItself } from '../function/returnItself'
import { ArrayKFn } from '../interface/ArrayKFn'
import { getKFn } from './getKFn'

/**
 * 快速根据指定函数对数组进行排序
 * TODO 此处有 bug，会改变原数组的顺序（在计算的 key 值相同的情况下）
 * 注: 使用递归实现，对于超大数组（其实前端的数组不可能特别大吧？#笑）可能造成堆栈溢出
 * @param arr 需要排序的数组
 * @param k 对数组中每个元素都产生可比较的值的函数，默认返回自身进行比较
 * @returns 排序后的新数组
 */
export function sortBy<T, K>(arr: T[], k: ArrayKFn<T, K> = returnItself): T[] {
  const kFn = getKFn(k)
  //  此处为了让 typedoc 能生成文档而不得不加上类型
  const newArr: Array<[T, number]> = arr.map((v, i) => [v, i] as [T, number])
  function _sort<V>(arr: V[], fn: (v1: V, v2: V) => number): V[] {
    // 边界条件，如果传入数组的值
    if (arr.length <= 1) {
      return arr
    }
    // 根据中间值对数组分治为两个数组
    const medianIndex = Math.floor(arr.length / 2)
    const medianValue = arr[medianIndex]
    const left = []
    const right = []
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i === medianIndex) {
        continue
      }
      const v = arr[i]
      if (fn(v, medianValue) <= 0) {
        left.push(v)
      } else {
        right.push(v)
      }
    }
    return _sort(left, fn)
      .concat([medianValue])
      .concat(_sort(right, fn))
  }
  return _sort(newArr, ([t1, i1], [t2, i2]) => {
    const k1 = kFn(t1, i1, arr)
    const k2 = kFn(t2, i2, arr)
    if (k1 === k2) {
      return 0
    } else if (k1 < k2) {
      return -1
    } else {
      return 1
    }
  }).map(([_v, i]) => arr[i])
}
