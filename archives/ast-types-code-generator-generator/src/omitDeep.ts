import { isObject, transform } from 'lodash-es'

export function omitDeep<T>(obj: T, keys: string[]): T {
  return transform(obj as any, (r: any, v, k) => {
    if (keys.includes(k as any)) return

    r[k] = isObject(v) ? omitDeep(v, keys as any) : v
  })
}
