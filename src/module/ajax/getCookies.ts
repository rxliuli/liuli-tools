import { splitHttpHeader } from './splitHttpHeader'

/**
 * 获取 cookie 键值映射 Map
 * @returns cookie 键值映射 Map
 * @deprecated 请使用更通用的 {@link splitHttpHeader} 函数
 */
export function getCookies() {
  return splitHttpHeader(document.cookie)
}
