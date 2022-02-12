import { groupBy } from './groupBy'

/**
 * 数组按照指定长度进行分段为二维数组
 * 注: num 必须要大于 1
 * @param arr 要进行分段的数组
 * @param num 每段的长度
 * @returns 分段后的二维数组
 */

export function segmentation<T>(arr: T[], num: number): T[][] {
  return Array.from(groupBy(arr, (item, i) => Math.floor(i / num)).values())
}
