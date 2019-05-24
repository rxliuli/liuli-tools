/**
 * 数组聚合函数类型，例如 reduce
 */
export type ArrayReduceCallback<V, T> = (
  res: V,
  item: T,
  index: number,
  arr: T[],
) => V
