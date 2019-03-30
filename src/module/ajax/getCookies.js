// @ts-check
/**
 * 获取 cookie 键值映射 Map
 * @returns {Map.<String,String>} cookie 键值映射 Map
 */
export function getCookies () {
  return document.cookie
    .split(';')
    .map(str => str.split('='))
    .map(arr => [arr[0].trim(), arr[1].trim()])
    .reduce((res, [k, v]) => res.set(k, v), new Map())
}
