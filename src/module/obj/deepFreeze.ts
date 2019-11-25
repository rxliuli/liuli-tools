import { TypeValidator } from './TypeValidator'

/**
 * 递归使对象不可变
 * @param obj 任何非空对象
 * @returns 新的不可变对象
 */
export function deepFreeze<T extends object>(obj: T): T {
  const freeze = (v: any) => {
    if (TypeValidator.isObject(v)) {
      deepFreeze(v)
    }
  }
  // 数组和对象分别处理
  if (TypeValidator.isArray(obj)) {
    obj.forEach(freeze)
  } else if (TypeValidator.isObject(obj)) {
    Object.keys(obj)
      .map(k => Reflect.get(obj, k))
      .forEach(freeze)
  }
  return Object.freeze(obj)
}
