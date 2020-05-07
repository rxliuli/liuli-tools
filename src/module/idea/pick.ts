export type ObjectEntries<T extends object> = [keyof T, T[keyof T]][]

/**
 * 从一个对象中挑选出来几个指定的字段
 * @param obj 指定对象
 * @param fieldList 指定对象字段列表
 * @returns 返回挑选字段组成的新对象
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  ...fieldList: K[]
): Pick<T, K> {
  const set = new Set(fieldList)
  return (Object.entries(obj) as ObjectEntries<T>).reduce((res, [k, v]) => {
    if (set.has(k as K)) {
      Reflect.set(res, k, v)
    }
    return res
  }, {} as Pick<T, K>)
}
