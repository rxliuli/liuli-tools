/**
 * 数组相关工具类
 */
export class ArrayUtil {
  /**
   * 交换数组两个位置的值
   * @param arr 数组
   * @param i 第一个下标
   * @param k 第二个下标
   */
  static swap(arr: any[], i: number, k: number): void {
    ;[arr[i], arr[k]] = [arr[k], arr[i]]
  }
}
