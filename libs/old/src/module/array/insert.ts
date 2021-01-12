/**
 * 在数组指定位置插入元素
 * @param arr 需要插入的数组
 * @param index 插入的下标，负值从末尾开始计算，超过数组最大长度则追加在最后
 * @param values 插入的值
 */
export function insert<T>(arr: T[], index: number, ...values: T[]): number {
  const res =
    index < 0 ? arr.length + index : index >= arr.length ? arr.length : index
  const delArr = arr.splice(index)
  arr.push(...values, ...delArr)
  return res
}
