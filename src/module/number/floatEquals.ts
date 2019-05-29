/**
 * 比较两个浮点数是否相等
 * 具体实现采用差值取绝对值并与 {@link Number.EPSILON} 比较的方式，如果小于浮点数最小差值，则认为它们是 [相等] 的
 * @param num1 第一个浮点数
 * @param num2 第二个浮点数
 * @returns 两数是否相等
 */
export function floatEquals(num1: number, num2: number): boolean {
  return Math.abs(num1 - num2) < Number.EPSILON
}
