import { sortBy } from './sortBy'

/**
 * 数组相关工具类
 */
export class ArrayUtil {
  /**
   * 交换数组两个位置的值
   * @param arr 数组
   * @param i 第一个下标
   * @param k 第二个下标
   * @returns 交换后的数组
   */
  static swap<T>(arr: T[], i: number, k: number): T[] {
    const res = arr.slice()
    ;[res[i], res[k]] = [res[k], res[i]]
    return res
  }

  /**
   * 无序比较两个数组
   * @param arr1 第一个数组
   * @param arr2 第二个数组
   * @returns 是否相同
   */
  static equalsByDisorder<T>(arr1: T[], arr2: T[]): boolean {
    return JSON.stringify(sortBy(arr1)) === JSON.stringify(sortBy(arr2))
  }
}
