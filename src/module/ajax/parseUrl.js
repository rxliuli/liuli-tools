/**
 * Url 对象
 */
var RxUrl = {
  createNew (rxUrl) {
    var res = {
      href: '', // 原链接
      website: '', // URL 站点
      protocal: '', // 协议
      domain: '', // 域名
      accessPath: '', // 绝对路径
      params: {} // 参数列表
    }
    Object.assign(res, rxUrl)
    return res
  }
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

  const regexp = new RegExp('^(\\w+)://([\\w\\.]*)')
  const temps = regexp.exec(url)
  const res = RxUrl.createNew({
    href: url,
    website: temps[0],
    protocal: temps[1],
    domain: temps[2]
  })
  let temp = url.substr(res.website.length)
  const markIndex = temp.indexOf('?')
  if (markIndex === -1) {
    res.accessPath = temp
    return res
  }
  res.accessPath = temp.substr(0, markIndex)
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
      var vs = params[k]
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
