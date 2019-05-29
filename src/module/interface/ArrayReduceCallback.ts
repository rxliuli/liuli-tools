/**
 * 数组聚合函数类型，例如 reduce
 */
export type ArrayReduceCallback<T, R> = (
  res: R,
  item: T,
  index: number,
  arr: T[],
) => R
