export class ClassUtil {
  /**
   * 扫描 class 原型上的方法
   * 注：无法扫描到箭头函数，因为它没有自己的 this
   * @param instance
   */
  static scan<T extends object>(instance: T): (keyof T)[] {
    const excludeFieldSet = new Set<PropertyKey>(['constructor'])
    return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
      (field) =>
        !excludeFieldSet.has(field) &&
        instance[field as keyof T] instanceof Function,
    ) as (keyof T)[]
  }

  /**
   * 为 class 原型上的方法绑定 this
   */
  static bindMethodThis<T extends object>(instance: T): T {
    this.scan(instance).forEach((_field) => {
      const field = _field as keyof T
      Reflect.set(instance, field, (instance[field] as any).bind(instance))
    })
    return instance
  }
}
