import { returnItself } from './returnItself'
import { TypeValidator } from '../obj/TypeValidator'
import { safeExec } from './safeExec'

/**
 * 提取对象中的字段并封装为函数
 * @param k 提取的字段，深度获取使用 . 分割不同的字段
 * @returns 获取对象中指定字段的函数
 */
export function extractField<T extends object>(
  k: PropertyKey,
): (obj: T) => any {
  const fields: PropertyKey[] = TypeValidator.isString(k) ? k.split('.') : [k]
  return fields.reduceRight((fn: (obj: T) => any, field: PropertyKey) => {
    return function(obj: T) {
      return safeExec(() => fn(Reflect.get(obj as any, field)))
    }
  }, returnItself)
}
