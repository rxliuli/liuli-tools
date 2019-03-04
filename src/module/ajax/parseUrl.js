/**
 * Url 对象
 */
const RxUrl = {
  createNew (rxUrl) {
    const res = {
      href: '', // 不包含网站域名的链接
      website: '', // URL 站点
      protocol: '', // 协议
      domain: '', // 域名
      accessPath: '', // 绝对路径,不包含参数
      params: {}, // 参数列表,
      url: '', // 原 url 链接
      port: 0 // 端口号
    }
    Object.assign(res, rxUrl)
    return res
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
 * @returns {RxUrl} json 对象
 */
function parseUrl (url) {
  if (!url) {
    throw new Error('url 不能为空')
  }

  const regexp = new RegExp('^((\\w+)://([\\w\\.]*)(:(\\d+))?)(.*)')
  const temps = regexp.exec(url)
  const res = RxUrl.createNew({
    url: url,
    website: temps[1],
    protocol: temps[2],
    domain: temps[3],
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
  if (!res.port) {
    res.port = protocol2Port[res.protocol] || ''
  }
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

export default parseUrl
