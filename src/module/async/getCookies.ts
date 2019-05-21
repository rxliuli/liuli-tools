/**
 * 获取 cookie 键值映射 Map
 * @returns cookie 键值映射 Map
 */
export function getCookies() {
  return document.cookie.split(';').reduce((res, str) => {
    const [k, v] = str.split('=')
    res.set(k, v)
    return res
  }, new Map())
}
