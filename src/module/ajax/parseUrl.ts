/**
 * Url 对象
 */
interface IUrlObject {
  /**
   * href 不包含网站域名的链接
   */
  href: string
  /**
   * website URL 站点
   */
  website: string
  /**
   * protocol 协议
   */
  protocol: string
  /**
   * domain 域名
   */
  domain: string
  /**
   * accessPath 绝对路径,不包含参数
   */
  accessPath: string
  /**
   * params 参数列表,
   */
  params: Map<string, string | string[]>
  /**
   * url 原 url 链接
   */
  url: string
  /**
   * port 端口号
   */
  port: number
}

/**
 * 协议与默认端口映射表
 */
const protocolPortMap = new Map()
  .set('http', 80)
  .set('https', 443)
  .set('ssh', 22)
  .set('ftp', 21)

/**
 * 解析 url 字符串
 * @param url url 字符串，不能为空
 * @returns url 对象
 * @deprecated 请使用原生 API URL 类，可以通过 new URL(url) 将 URL 字符串转换为 URL 对象，并获取指定的信息
 */
export function parseUrl(url: string): IUrlObject | null {
  if (!url) {
    throw new Error('Url cannot be empty')
  }

  const regexp = new RegExp('^((\\w+)://([\\w\\.]*)(:(\\d+))?)(.*)')
  const temps = regexp.exec(url)
  if (temps === null) {
    return null
  }
  const website = temps[1]
  const protocol = temps[2]
  const domain = temps[3]
  const portStr = temps[5]
  const href = temps[6]

  // 截取域名之后的内容
  const temp = url.substr(website.length)
  const markIndex = temp.indexOf('?')
  // 如果没有携带参数则直接返回
  if (markIndex === -1) {
    const accessPath = temp
    return {
      url,
      website,
      protocol,
      domain,
      // tslint:disable-next-line:radix
      port: parseInt(portStr),
      href,
      accessPath,
      params: new Map<string, string>(),
    }
  }
  let accessPath = temp.substr(0, markIndex)
  if (accessPath.endsWith('/')) {
    accessPath = accessPath.substring(0, accessPath.length - 1)
  }
  const port = portStr || protocolPortMap.get(protocol) || 0
  // 解析参数列表
  const params = temp
    .substr(markIndex + 1)
    .split('&')
    .map(str => str.split('='))
    .filter(arr => arr[0] !== '')
    .reduce((params, arr: string[]) => {
      const k = decodeURIComponent(arr[0])
      const v = decodeURIComponent(arr.length === 1 ? '' : arr[1])
      // 如果已经存在了就认为是数组参数
      const vs = params.get(k)
      if (vs === undefined) {
        params.set(k, v)
      } else {
        if (!Array.isArray(vs)) {
          params.set(k, [vs])
        }
        if ((params.get(k) as string[]).length !== undefined) {
          ;(params.get(k) as string[]).push(v)
        }
      }
      return params
    }, new Map<string, string | string[]>())
  return {
    url,
    website,
    protocol,
    domain,
    port,
    href,
    accessPath,
    params,
  }
}
