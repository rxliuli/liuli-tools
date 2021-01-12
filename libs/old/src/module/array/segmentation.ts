/**
 * 数组按照指定长度进行分段为二维数组
 * 注: num 必须要大于 1
 * @param arr 要进行分段的数组
 * @param num 每段的长度
 * @returns 分段后的二维数组
 */
export function segmentation<T>(arr: T[], num: number): T[][] {
  return arr.reduce((res, v, i) => {
    const index = (i + 1) % num
    if (index === 1) {
      res.push([])
    }
    res[res.length - 1].push(v)
    return res
  }, new Array<T[]>())
}
