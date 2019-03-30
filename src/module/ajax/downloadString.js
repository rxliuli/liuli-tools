// @ts-check
import { download } from './download'

/**
 * 在浏览器上下载文本内容
 * @param {String} str 字符串内容
 * @param {String} [filename='unknown.txt'] 下载文件名，没有则默认为链接中的文件名
 */
export async function downloadString (str, filename = 'unknown.txt') {
  const blob = new Blob([str], {
    type: 'text/plain'
  })
  download(blob, filename)
}
