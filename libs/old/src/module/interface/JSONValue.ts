/**
 * JSON 支持的序列化的值
 */
export type JSONValue =
  | number
  | string
  | boolean
  | null
  | undefined
  | JSONValue[]
  | { [key: string]: JSONValue }
