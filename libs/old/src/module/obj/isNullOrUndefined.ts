/**
 * 判断一个对象是否是无效的
 * 无效的值仅包含 null/undefined
 * @param object 任何一个对象
 * @returns 是否无效的值
 */
export function isNullOrUndefined(object: any): object is null | undefined {
  return object === undefined || object === null
}
