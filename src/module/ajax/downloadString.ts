import { download } from './download'
import { strToBlob } from './strToBlob'

/**
 * 在浏览器上下载文本内容
 * @param str 字符串内容
 * @param filename 下载文件名，没有则默认为链接中的文件名
 */
export async function downloadString(str: string, filename = 'unknown.txt') {
  download(strToBlob(str), filename)
}
