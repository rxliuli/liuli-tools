/**
 * 无限的超时时间
 * TODO 此处暂时使用字符串作为一种折衷方法，因为 Symbol 无法被序列化为 JSON，反向序列化也是不可能的
 */
export const TimeoutInfinite = 'TimeoutInfinite'

/**
 * 缓存选项
 * @param options.timeout 超时时间，以毫秒为单位
 * @param options.timeStart 缓存开始时间
 * @param options.serialize 缓存序列化
 * @param options.deserialize 缓存反序列化
 */
export interface ICacheOption {
  timeout: number | string
  timeStart: number
  serialize: (val: any) => string
  deserialize: (s: string) => any
}
