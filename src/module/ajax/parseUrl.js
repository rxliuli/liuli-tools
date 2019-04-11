// @ts-check
/**
 * Url 对象
 * @class UrlObject
 */
class UrlObject {
  /**
   * 构造函数
   * @param {Object} option 可选项
   * @param {String} [option.href=''] 不包含网站域名的链接
   * @param {String} [option.website=''] URL 站点
   * @param {String} [option.protocol=''] 协议
   * @param {String} [option.domain=''] 域名
   * @param {String} [option.accessPath=''] 绝对路径,不包含参数
   * @param {Object} [option.params={}] 参数列表,
   * @param {String} [option.url=''] 原 url 链接
   * @param {Number} [option.port=0] 端口号
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
  } = {}) {
    /**
     * @type {String} 不包含网站域名的链接
     */
    this.href = href
    /**
     * @type {String} URL 站点
     */
    this.website = website
    /**
     * @type {String} 协议
     */
    this.protocol = protocol
    /**
     * @type {String} 域名
     */
    this.domain = domain
    /**
     * @type {String} 绝对路径,不包含参数
     */
    this.accessPath = accessPath
    /**
     * @type {Object} 参数列表,
     */
    this.params = params
    /**
     * @type {String} 原 url 链接
     */
    this.url = url
    /**
     * @type {Number} 端口号
     */
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
 * @param {String} url url 字符串，不能为空
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
