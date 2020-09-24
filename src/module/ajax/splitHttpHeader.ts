/**
 * 分割 http 请求中 header 的内容为一个 map
 * 分隔符参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type}
 * @param header
 */
export function splitHttpHeader(header: string) {
  return header.split(';').reduce((res, str) => {
    let [k, v] = str.split('=')
    if (v !== undefined) {
      v = decodeURIComponent(v)
    }
    res.set(k.trim(), v)
    return res
  }, new Map())
}
