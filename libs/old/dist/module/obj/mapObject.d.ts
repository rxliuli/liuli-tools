/**
 * 将对象的键和值进行映射
 * @param obj
 * @param func
 */
export declare function mapObject<R extends Record<string, any>>(
  obj: Record<string, any>,
  func: (kv: [string, any]) => [string, any],
): R
//# sourceMappingURL=mapObject.d.ts.map
