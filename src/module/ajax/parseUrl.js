// @ts-check
/**
 * Url 对象
 */
class UrlObject {
  /**
   * 构造函数
   * {String} href 不包含网站域名的链接
   * {String} website URL 站点
   * {String} protocol 协议
   * {String} domain 域名
   * {String} accessPath 绝对路径,不包含参数
   * {Object} params 参数列表,
   * {String} url 原 url 链接
   * {Number} port 端口号
   */
  constructor ({
    href = '',
    website = '',
    protocol = '',
    domain = '',
    accessPath = '',
    params = {},
    url = '',
    port = 0
  }) {
    this.href = href
    this.website = website
    this.protocol = protocol
    this.domain = domain
    this.accessPath = accessPath
    this.params = params
    this.url = url
    this.port = port
  }
}

/**
 * 协议与默认端口映射表
 */
const protocol2Port = {
  http: 80,
  https: 443,
  ssh: 22,
  ftp: 21
}

/**
 * 解析 url 字符串
 * @param {String} url url 字符串
 * @returns {UrlObject} url 对象
 */
export function parseUrl (url) {
  if (!url) {
    throw new Error('url 不能为空')
  }

  const regexp = new RegExp('^((\\w+)://([\\w\\.]*)(:(\\d+))?)(.*)')
  const temps = regexp.exec(url)
  const res = new UrlObject({
    url: url,
    website: temps[1],
    protocol: temps[2],
    domain: temps[3],
    // @ts-ignore
    port: temps[5],
    href: temps[6]
  })
  let temp = url.substr(res.website.length)
  const markIndex = temp.indexOf('?')
  if (markIndex === -1) {
    res.accessPath = temp
    return res
  }
  res.accessPath = temp.substr(0, markIndex)
  if (res.accessPath.endsWith('/')) {
    res.accessPath = res.accessPath.substring(0, res.accessPath.length - 1)
  }
  res.port = res.port || protocol2Port[res.protocol] || ''
  // 解析参数列表
  res.params = temp
    .substr(markIndex + 1)
    .split('&')
    .map(str => str.split('='))
    .filter(arr => arr[0] !== '')
    .reduce((params, arr) => {
      const k = decodeURIComponent(arr[0])
      const v = decodeURIComponent(arr.length === 1 ? '' : arr[1])
      // 如果已经存在了就认为是数组参数
      const vs = params[k]
      if (vs !== undefined) {
        if (!Array.isArray(vs)) {
          params[k] = [vs]
        }
        params[k].push(v)
      } else {
        params[k] = v
      }
      return params
    }, {})
  return res
}
