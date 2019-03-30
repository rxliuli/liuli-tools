// @ts-check
import { download } from './download'

/**
 * 根据 url 下载二进制资源
 * @param {String} url 下载请求信息
 * @param {String} [filename] 下载文件名，没有则默认为链接中的文件名
 */
export async function downloadUrl (
  url,
  filename = url.substr(url.lastIndexOf('/'))
) {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    download(blob, filename)
  } catch (error) {
    return console.log('下载出错了 ', error)
  }
}
